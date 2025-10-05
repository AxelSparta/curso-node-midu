import { pool } from '../../db.js'
import { readJSON } from '../../utils.js'
const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const { rows: genreResult } = await pool.query(
        'SELECT id FROM genre WHERE LOWER(name) = $1',
        [genre]
      )
      if (genreResult.length === 0) {
        return []
      }

      const { id: genreId } = genreResult[0]

      // obtener todas las movies que tengan ese genreId
      const { rows: moviesByGenre } = await pool.query(
        `SELECT id, title, year, director, duration, poster, rate FROM movie_genre
          JOIN movie ON movie.id = movie_genre.movie_id
          WHERE movie_genre.genre_id = $1
        `,
        [genreId]
      )
      return moviesByGenre
    }
    const { rows } = await pool.query('SELECT * FROM movie')
    return rows
  }

  static async getById ({ id }) {
    const { rows } = await pool.query('SELECT * FROM movie WHERE id = $1', [id])
    if (rows.length === 0) {
      return null
    }
    return rows[0]
  }

  static async create ({ data }) {
    const { title, year, director, duration, poster, rate, genre } = data
    const movieId = crypto.randomUUID()
    try {
      const result = await pool.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [movieId, title, year, director, duration, poster, rate]
      )
    } catch (error) {
      throw new Error('Error adding movie to database')
    }
    // buscar el id de todos los genres y hacer los inserts en movie_genre
    for (const name of genre) {
      const { rows: genreRows } = await pool.query(
        'SELECT id FROM genre WHERE LOWER(name) = $1',
        [name.toLowerCase()]
      )
      try {
        let genreId = genreRows[0]?.id

        await pool.query(
          'INSERT INTO movie_genre (movie_id, genre_id) VALUES ($1, $2)',
          [movieId, genreId]
        )
      } catch (error) {
        throw new Error('Error adding genre to database')
      }
    }
    return { id: movieId, ...data }
  }

  static async update ({ id, data }) {}

  static async delete ({ id }) {}
}
