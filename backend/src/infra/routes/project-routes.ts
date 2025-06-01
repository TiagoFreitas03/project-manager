import { FastifyInstance } from 'fastify'
import { createProjectController } from '../controllers/create-project-controller'
import { editProjectController } from '../controllers/edit-project-controller'
import { searchProjectsController } from '../controllers/search-projects-controller'
import { getProjectBySlugController } from '../controllers/get-project-by-slug-controller'

export async function projectRoutes(app: FastifyInstance) {
  app.post('/projects', createProjectController)
  app.put('/projects/:projectId', editProjectController)
  app.get('/projects', searchProjectsController)
  app.get('/projects/:slug', getProjectBySlugController)
}
