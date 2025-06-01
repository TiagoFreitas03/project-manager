import fastify from 'fastify'
import { ZodError } from 'zod'
import { projectRoutes } from './routes/project-routes'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { BadRequestError } from '@/core/errors/bad-request-error'
import { taskRoutes } from './routes/task-routes'

export const app = fastify()

app.register(projectRoutes)
app.register(taskRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply
      .status(404)
      .send({ message: 'Resource not found.', params: request.params })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      message: 'Validation error.',
      detail: error.message,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
