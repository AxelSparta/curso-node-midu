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
        `SELECT id, title, year, director, duration, poster, rate FROM movie_genres
          JOIN movie ON movie.id = movie_genres.movie_id
          WHERE movie_genres.genre_id = $1
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
          'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)',
          [movieId, genreId]
        )
      } catch (error) {
        throw new Error('Error adding genre to database')
      }
    }
    return { id: movieId, ...data }
  }

  static async update ({ id, data }) {
    const { rows: movie } = await pool.query(
      'SELECT * FROM movie WHERE id = $1',
      [id]
    )
    if (movie.length === 0) {
      return false
    }

    const { genre } = data

    if (genre) {
      // eliminar los genres actuales de la movie en movie_genres
      try {
        await pool.query('DELETE FROM movie_genres WHERE movie_id = $1', [id])
      } catch (error) {
        throw new Error('Error deleting old movie genres from database')
      }

      // insertar los nuevos genres
      for (const name of genre) {
        const { rows: genreRows } = await pool.query(
          'SELECT id FROM genre WHERE LOWER(name) = $1',
          [name.toLowerCase()]
        )
        try {
          let genreId = genreRows[0]?.id

          await pool.query(
            'INSERT INTO movie_genres (movie_id, genre_id) VALUES ($1, $2)',
            [id, genreId]
          )
        } catch (error) {
          throw new Error('Error adding genre to database')
        }
      }
    }

    const { title, year, director, duration, poster, rate } = {
      ...movie[0],
      ...data
    }

    try {
      await pool.query(
        `UPDATE movie SET title = $1, year = $2, director = $3, duration = $4, poster = $5, rate = $6
      WHERE id = $7`,
        [title, year, director, duration, poster, rate, id]
      )
      return true
    } catch (error) {
      return false
    }
  }

  static async delete ({ id }) {
    try {
      const result1 = await pool.query(`DELETE FROM movie_genres WHERE movie_id = $1`, [id])
      const result2 = await pool.query(`DELETE FROM movie WHERE id = $1`, [id])
      console.log(result1, result2)
      return true
    } catch (error) {
      console.log(error)
      throw new Error('Error al eliminar película')
    }
  }
}
