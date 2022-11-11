import { LocalWorkspace, fullyQualifiedStackName } from '@pulumi/pulumi/automation'
import { BrandNode } from './components'

async function createBrandNode() {
  const node = new BrandNode('shovel-sandbox', { nginxPort: 8080 })

  return node
}

LocalWorkspace.createOrSelectStack({
  program: createBrandNode,
  projectName: 'brand-node',
  stackName: fullyQualifiedStackName('trubit', 'brand-node', 'dev'),
}).then(stack => stack.up()).then(result => {
  console.log('stack output:', result.outputs)
}).catch(e => console.error(e))
