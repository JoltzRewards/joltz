import { Output, ComponentResource, ComponentResourceOptions, output } from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'

export class BrandNode extends ComponentResource {
  securityGroup: aws.ec2.SecurityGroup
  cluster: awsx.ecs.Cluster
  vpc: awsx.ec2.Vpc
  instance: aws.ec2.Instance
  //
  vpcId: Output<string>
  securityGroupId: Output<string>
  clusterId: Output<string>
  instanceId: Output<string>

  constructor(
    brand: string,
    opts: ComponentResourceOptions & { nginxPort: number },
  ) {
    super('trubit:brand-node', brand, {}, opts)

    const vpc = new awsx.ec2.Vpc(`${brand}-vpc`, {}, { parent: this })

    const securityGroup = new aws.ec2.SecurityGroup(
      `${brand}-security-group`,
      {
        vpcId: vpc.id,
        ingress: [
          {
            description: 'allow SSH access',
            fromPort: 22,
            toPort: 22,
            protocol: 'tcp',
          },
          {
            description: 'allow http access',
            fromPort: 80,
            toPort: opts.nginxPort || 8080,
            protocol: 'tcp',
          },
          {
            description: 'allow https access',
            fromPort: 443,
            toPort: 443,
            protocol: 'tcp',
          },
        ],
        egress: [
          {
            fromPort: 0,
            toPort: 0,
            protocol: '-1',
          },
        ],
      },
      { parent: this },
    )

    const cluster = new awsx.ecs.Cluster(
      `${brand}-cluster`,
      {
        securityGroups: [securityGroup.id],
        vpc,
      },
      { parent: this },
    )

    const ami = output(aws.ec2.getAmi({
      filters: [
        { name: "name", values: ["amzn-ami-hvm-*-x86_64-ebs"] },
      ],
      owners: ["137112412989"], // Amazon
      mostRecent: true,
    })).apply(result => result.id);

    const instance = new aws.ec2.Instance(
      `${brand}-node`,
      {
        ami,
        // install umbrel/configure machine
        instanceType: 't2.micro',
        userData: `
          #!/bin/bash
          curl -L https://umbrel.sh | bash
        `
      }
    )

    this.securityGroup = securityGroup
    this.cluster = cluster
    this.vpc = vpc
    this.instance = instance

    this.vpcId = vpc.vpc.id
    this.clusterId = cluster.cluster.id
    this.securityGroupId = securityGroup.id
    this.instanceId = instance.id

    this.registerOutputs()
  }
}
