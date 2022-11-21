import { PulumiFn } from '@pulumi/pulumi/automation'
import { createBrandNode } from '../functions'

const brandNode = createBrandNode({
  brand: 'trubit-sandbox',
  project: 'sandbox-test',
  stack: 'dev',
})
