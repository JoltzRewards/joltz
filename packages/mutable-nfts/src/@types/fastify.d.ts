import { FastifyStaticOptions } from 'fastify-static'

declare module 'fastify' {
  interface FastifyReplyInterface {
    sendFile: (path: string, options?: FastifyStaticOptions) => void
  }
}
