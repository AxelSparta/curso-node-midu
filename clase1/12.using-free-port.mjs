import { getPort } from './12.free-port.mjs'
import http from 'node:http'

const server = http.createServer()

getPort(1234).then(port => {
  server.listen(port, () => {
    console.log('listening on port', port)
  })
})
