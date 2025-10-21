import express from 'express';
import morgan from 'morgan'; // logger HTTP

const PORT = 3000

const app = express()
app.use(morgan('dev')) // usar el logger

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
