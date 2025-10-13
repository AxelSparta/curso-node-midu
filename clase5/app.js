import 'dotenv/config'
import express, { json } from 'express'
import { MovieModel } from './models/postgresql/movie.js'

// COMO LEER UN JSON EN ESMODULES
import { createRequire } from 'node:module'
import { createMovieRouter } from './routes/movies.js'
const require = createRequire(import.meta.url)
const movies = require('./movies.json')

const app = express()

// para desactivar la ca becera por default que lanza express siempre que devuelve algo el server
app.disable('x-powered-by')

const port = parseInt(process.env.PORT) || process.argv[3] || 8080

// MIDDLEWARES
app.use(json())

// ROUTES
app.use('/movies', createMovieRouter({ movieModel: MovieModel }))

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
