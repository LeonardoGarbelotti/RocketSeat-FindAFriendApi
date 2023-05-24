import fastify from 'fastify'

import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

// app.register(userRoutes)
// app.register(gymRoutes)
// app.register(checkInsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Body Validation Error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TO DO: use external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
