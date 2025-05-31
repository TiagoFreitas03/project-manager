import { FastifyInstance } from 'fastify'
import { createProjectController } from '../controllers/create-project-controller'

export async function projectRoutes(app: FastifyInstance) {
  app.post('/projects', createProjectController)
}
