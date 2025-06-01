import { FastifyInstance } from 'fastify'
import { createProjectController } from '../controllers/create-project-controller'
import { editProjectController } from '../controllers/edit-project-controller'

export async function projectRoutes(app: FastifyInstance) {
  app.post('/projects', createProjectController)
  app.put('/projects/:projectId', editProjectController)
}
