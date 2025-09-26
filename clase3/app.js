const express = require('express')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schemas/movie.js')
const app = express()

// para desactivar la ca becera por default que lanza express siempre que devuelve algo el server
app.disable('x-powered-by')

// REST: Arquitectura de software, significa Representational State Transfer, toda arquitectura de software tienen unos principios y fundamentos para que el desarrollo sea escalable, simple, fiable, fácil de modificar...

// En rest api los recursos se identifican con una URL,
// Para definir las operaciones se utilizan los verbos HTTP

/*
PRINCIPIOS DE REST API:
- Simplicidad
- Escalabilidad
- Portabilidad
- Visibilidad
- Fácil de modificar
- Fiabilidad

RECURSOS: Todo es considerado como recurso ej: usuario, nota, etc.
Y cada recurso se identifica con una URL

MÉTODOS Verbos HTTP: Para definir las operaciones que se pueden realizar con un recurso

REPRESENTACIONES: Los recursos pueden tener múltiples representaciones, como JSON, XML, HTML, etc.
El cliente debería decidir la representación del recurso.

STATELESS: Cada solicitud debe ser completa para precesar la request, el servidor no tiene que guardar información para saber contestar esta request.

SEPARACIÓN DE CONCEPTOS: Permite que cliente y servidor evolucionen de forma separada.

INTERFAZ UNIFORME

*/

const port = parseInt(process.env.PORT) || process.argv[3] || 8080

// captura la request y detecta si se tiene que hacer la transformación a json del req.body
app.use(express.json())

app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const moviesByGenre = movies.filter(movie => {
      return movie.genre.some(
        g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    })
    return res.json(moviesByGenre)
  }

  res.json(movies)
})

// express utiliza path-to-regexp para parsear las urls, también se pueden utilizar regex para poder capturar las partes de la url...
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(movie => movie.id === req.params.id)
  if (!movie) return res.status(404).json({ message: 'Movie not found' })
  res.json(movie)
})

// cada recurso se identifica con una url, por lo que para movies se utiliza el mismo url
app.post('/movies', (req, res) => {
  const resultValidationMovie = validateMovie(req.body)

  if (resultValidationMovie.error)
    return res
      .status(400)
      .json({ error: JSON.parse(resultValidationMovie.error.message) })

  const newMovie = {
    id: crypto.randomUUID(),
    ...resultValidationMovie.data
  }
  // estamos mutando el arreglo directamente, y estamos guardando el estado en memoria con lo cual no es REST
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(movie => movie.id === req.params.id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const resultValidationMovie = validatePartialMovie(req.body)

  if (resultValidationMovie.error)
    return res
      .status(400)
      .json({ error: JSON.parse(resultValidationMovie.error.message) })

  const updatedMovie = {
    ...movies[movieIndex],
    ...resultValidationMovie.data
  }

  movies[movieIndex] = updatedMovie

  res.json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(movie => movie.id === req.params.id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  movies = movies.filter(movie => movie.id !== movieIndex)
  return res.status(200).json(movies)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
