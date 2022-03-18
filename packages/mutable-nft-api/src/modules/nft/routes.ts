import { FastifyInstance } from 'fastify'

import { availableNfts, NFTMetadata } from '../../db'

export function nftHandler(server: FastifyInstance, options, next) {
  server.get('/', {}, (req, res) => {
    res.send({ status: 'ok' })
  })

  server.get<{ Params: { id: number } }>('/:id', {}, async (req, res) => {
    const nftMetadata: NFTMetadata = availableNfts[req.params.id]

    if (!nftMetadata) {
      return res.send({
        status: '404',
      })
    }

    const completeMetadata = {
      ...nftMetadata,
      image: `${nftMetadata.image}/nft/${nftMetadata.id}/image`,
    }

    res.send(completeMetadata)
  })

  server.get<{ Params: { id: number } }>('/:id/image', {}, async (req, res) => {
    res.sendFile(`images/${req.params.id}.png`)
  })

  next()
}
