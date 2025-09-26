import http from 'node:http'

const server = http.createServer((req, res) => {
    console.log('request recived!')
    res.end('Hello World')
})
// cuando ponemos el 0 automáticamente tomará el primer port disponible y con server.address().port podemos verlo
server.listen(0, () => {
    console.log('listening on port', server.address().port)
})


