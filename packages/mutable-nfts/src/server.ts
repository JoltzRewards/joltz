import fastify from 'fastify'
import fastifyStatic from 'fastify-static'
import path from 'path'

import { nftHandler } from './modules'

export function createServer() {
  const server = fastify()
  server.register(fastifyStatic, {
    root: path.join(__dirname, process.env.STATIC_ASSETS_DIRECTORY),
  })
  server.register(require('fastify-cors'))
  server.register(require('fastify-oas'), {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'product api',
        description: 'api documentation',
        version: '0.1.0',
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
          description: 'development',
        },
        {
          url: 'https://api.trubit.tech',
          description: 'production',
        },
      ],
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  })

  server.register(nftHandler, { prefix: '/nft' })

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString())
    res.send({ error })
  })

  return server
}
