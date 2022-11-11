import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
// import { uuid } from 'uuidv4'

// awsx.ecr.Repository
// const config = new pulumi.Config()
// const brand = config.get('BRAND_IDENTIFIER') || `brand-${uuid()}`

// Create an AWS resource (S3 Bucket)

// Export the name of the bucket
// export const bucketName = bucket.id

export class BrandNode extends pulumi.ComponentResource {
  securityGroup: aws.ec2.SecurityGroup
  cluster: awsx.ecs.Cluster
  vpc: awsx.ec2.Vpc
  //
  vpcId: pulumi.Output<string>
  securityGroupId: pulumi.Output<string>
  clusterId: pulumi.Output<string>

  constructor(
    brand: string,
    opts: pulumi.ComponentResourceOptions & { nginxPort: number },
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

    this.securityGroup = securityGroup
    this.cluster = cluster
    this.vpc = vpc

    this.vpcId = vpc.vpc.id
    this.clusterId = cluster.cluster.id
    this.securityGroupId = securityGroup.id

    this.registerOutputs()
  }
}
