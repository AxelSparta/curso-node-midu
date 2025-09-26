import { MovieModel } from "../models/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movie.js"

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query

    const movies = await MovieModel.getAll({ genre })

    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    try {
      const movie = await MovieModel.getById({ id })
      res.json(movie)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  }

  static async create (req, res) {
    const resultValidationMovie = validateMovie(req.body)

    if (resultValidationMovie.error)
      return res
        .status(400)
        .json({ error: JSON.parse(resultValidationMovie.error.message) })

    const newMovie = await MovieModel.create({
      data: resultValidationMovie.data
    })

    res.status(201).json(newMovie)
  }

  static async update (req, res) {
    const resultValidationMovie = validatePartialMovie(req.body)

    if (resultValidationMovie.error)
      return res
        .status(400)
        .json({ error: JSON.parse(resultValidationMovie.error.message) })

    const isUpdated = await MovieModel.update({
      id: req.params.id,
      data: resultValidationMovie.data
    })

    if (!isUpdated) return res.status(404).json({ message: 'Movie not found' })

    return res.status(204).end()
  }

  static async delete (req, res) {
    const isDeleted = await MovieModel.delete({ id: req.params.id })

    if (!isDeleted) return res.status(404).json({ message: 'Movie not found' })

    return res.status(204).end()
  }
}
