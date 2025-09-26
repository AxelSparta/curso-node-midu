const http = require('node:http') // protocolo HTTP
const fs = require('node:fs')
// HTTP es un protocolo para transmitir información, significa Hyper Text Transfer Protocol

// headers son información adicional que va pegada a la petición para dar contexto a la misma, mientras que el body es donde viaja la información...

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  // seteamos el header de la respuesta... Para que el navegador lo interprete correctamente...
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Mi página</h1>')
  } else if (req.url === '/imagen-super-bonita.png') {
    fs.readFile('./placa.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        // en este caso cambiamos el header content-type, ya que enviamos una imagen y no un html
        // data nos devuelve un buffer es una memoria temporal donde se guarda lo que se leyó del archivo, estos datos que se leen están en binario... 
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404 // Not Found
    res.end('<h1>404</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listening on port http://localhost:${desiredPort}`)
})