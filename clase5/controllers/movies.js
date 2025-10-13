import { validateMovie, validatePartialMovie } from '../schemas/movie.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }
  getAll = async (req, res) => {
    const { genre } = req.query

    const movies = await this.movieModel.getAll({ genre })

    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    try {
      const movie = await this.movieModel.getById({ id })
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' })
      }
      res.json(movie)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  create = async (req, res) => {
    const resultValidationMovie = validateMovie(req.body)

    if (resultValidationMovie.error)
      return res
        .status(400)
        .json({ error: JSON.parse(resultValidationMovie.error.message) })

    const newMovie = await this.movieModel.create({
      data: resultValidationMovie.data
    })

    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
    const resultValidationMovie = validatePartialMovie(req.body)

    if (resultValidationMovie.error)
      return res
        .status(400)
        .json({ error: JSON.parse(resultValidationMovie.error.message) })

    const isUpdated = await this.movieModel.update({
      id: req.params.id,
      data: resultValidationMovie.data
    })

    if (!isUpdated) return res.status(404).json({ message: 'Movie not found' })

    return res.status(204).end()
  }

  delete = async (req, res) => {
    const isDeleted = await this.movieModel.delete({ id: req.params.id })

    if (!isDeleted) return res.status(404).json({ message: 'Movie not found' })

    return res.status(204).end()
  }
}
