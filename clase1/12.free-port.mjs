import net from 'node:net'

export function getPort(desiredPort) {

  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.listen(desiredPort, () => {
      const port = server.address().port
      server.close(() => resolve(port))
    })
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        getPort(0).then(port => port)
      } else {
        reject(error)
      }
    })
  })
}