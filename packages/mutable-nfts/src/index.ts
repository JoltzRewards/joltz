import dotenv from 'dotenv'

dotenv.config()

import { createServer } from './server'

const server = createServer()

server.listen(+process.env.PORT, '0.0.0.0', (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})

module.exports = server
