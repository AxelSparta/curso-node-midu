import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan'; // logger HTTP
import { Server } from 'socket.io';

const PORT = 3000

const app = express()
const server = createServer(app)
const io = new Server(server)


io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('message', (data) => {
    console.log('Message received:', data)
    io.emit('message', data) // reenviar el mensaje a todos los clientes
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })

  socket.on('chat message', (msg) => {
    console.log('Chat message received:', msg)
    io.emit('chat message', msg) // broadcast reenviar el mensaje a todos los clientes
  })
})

app.use(morgan('dev')) // usar el logger

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
