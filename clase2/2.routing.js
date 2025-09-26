const http = require('node:http')

// commonJS -> modulos clásicos de node podemos importar directamente el json...
const dittoJSON = require('./pokemon/ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':

          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          // Al cliente siempre tenemos que mandar el json en formato string... Luego el mismo lo interpretará como corresponda
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // escuchar el evento data, el mismo trae la información por trozos que serían los chunks, esta info se guarda en binario
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            // una vez termina de leer la data, parseamos el body para que se pueda manipular la información correctamente
            const data = JSON.parse(body)
            // Acá se podría guardar los datos en una BD
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }

        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('404 Not Found')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('server listening on port http://localhost:1234')
})