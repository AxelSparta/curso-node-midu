import express, { json } from 'express'

// COMO LEER UN JSON EN ESMODULES
import { createRequire } from 'node:module'
import { moviesRouter } from './routes/movies.js'
const require = createRequire(import.meta.url)
const movies = require('./movies.json')

const app = express()

// para desactivar la ca becera por default que lanza express siempre que devuelve algo el server
app.disable('x-powered-by')

const port = parseInt(process.env.PORT) || process.argv[3] || 8080

// MIDDLEWARES
app.use(json())

// ROUTES
app.use('/movies', moviesRouter)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
