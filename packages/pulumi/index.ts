import { LocalWorkspace } from '@pulumi/pulumi/automation'
import { BrandNode } from './components'

async function createBrandNode() {
  const node = new BrandNode('shovel-sandbox', { nginxPort: 8080 })

  return node
}

const workspace = LocalWorkspace.createOrSelectStack({
  program: createBrandNode,
  projectName: 'brand-node',
  stackName: 'trubit',
})
