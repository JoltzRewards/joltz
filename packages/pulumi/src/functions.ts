import { LocalWorkspace, PulumiFn, Stack, UpResult } from '@pulumi/pulumi/automation'
import { BrandNode } from './components'

type CreateBrandNodeOptions = {
  brand: string
  project: string
  stack: string
}

export const brandNodeProgram = (opts: { brand: string; nginxPort?: number }) => {
  return () => {
    const node = new BrandNode(opts.brand, { nginxPort: opts.nginxPort || 8080 })

    return node
  }
}

export async function createBrandNode(opts: CreateBrandNodeOptions) {
  let stack: Stack | null = null
  let upResults: UpResult | null = null

  console.debug(`Creating new brand node for ${opts.brand}`)

  const program = brandNodeProgram({ brand: opts.brand }) as any as PulumiFn

  console.debug(`Pulumi program created for ${opts.brand}. Preparing to create/select stack.`)

  try {
    stack = await LocalWorkspace.createOrSelectStack({
      program,
      projectName: opts.project,
      stackName: opts.stack,
    })

    console.debug('Stack results:\n', stack)
  } catch (error) {
    console.error('Failed to create or find stack\n')
    console.error(
      `input: { brand: ${opts.brand}, project: ${opts.project}, stack: ${opts.stack} }\n`,
    )
    console.error('error:\n', error)
    throw new Error(error as any)
  }

  try {
    upResults = await stack.up()

    console.debug('Stack.up results:\n', upResults)
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
      summary: upResults.summary,
    },
  }
}
