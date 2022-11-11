import { LocalWorkspace, fullyQualifiedStackName, PulumiFn } from '@pulumi/pulumi/automation'
import { BrandNode } from './components'

type CreateStackOptions = {
  program: PulumiFn;
  project: string;
  stack: string;
}

export function createBrandNode(opts: { brand: string; nginxPort?: number; }) {
  const node = new BrandNode(opts.brand, { nginxPort: opts.nginxPort || 8080 })

  return node
}

export async function createStack(opts: CreateStackOptions) {
  let stack = null
  let upResults = null

  try {
    stack = await LocalWorkspace.createOrSelectStack({
      program: opts.program,
      projectName: opts.project,
      stackName: opts.stack,
    })
  } catch (error) {
    console.error('Failed to create or find stack\n')
    console.error(`input: { program: ${opts.program}, stack: ${opts.stack} }\n`)
    console.error('error:\n', error)
    throw new Error(error as any)
  }

  try {
    upResults = await stack.up()
  } catch (error) {
    console.error('Failed to start stack:\n', error)
    throw new Error(error as any)
  }

  return {
    stack,
    outputs: upResults.outputs,
    startup: {
      stderror: upResults.stderr,
      stdout: upResults.stdout,
      summary: upResults.summary
    }
  }
}
