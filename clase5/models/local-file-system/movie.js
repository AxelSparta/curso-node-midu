import { readJSON } from '../../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(movie => {
        return movie.genre.some(
          g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      })
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    if (!movie) {
      throw new Error('Movie not found')
    }
    return movie
  }

  static async create ({ data }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...data
    }
    movies.push(newMovie)
    return newMovie
  }

  static async update ({ id, data }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    const updatedMovie = {
      ...movies[movieIndex],
      ...data
    }

    movies[movieIndex] = updatedMovie
    return true
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }
}
