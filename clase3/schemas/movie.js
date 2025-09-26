const z = require('zod')

const movieSchema = z.object({
  title: z.string('Movie title must be a string'),
  year: z.number().int(),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.url(),
  genre: z.array(
    z.enum([
      'Action',
      'Adventure',
      'Comedy',
      'Drama',
      'Horror',
      'Fantasy',
      'Thriller',
      'Crime'
    ]),
    {
      required_error: 'Movie must have at least one genre',
      invalid_type_error: 'Movie genres must be an array of strings'
    }
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
