import { FastifyInstance } from 'fastify'
import { createTaskController } from '../controllers/create-task-controller'
import { fetchProjectTasksController } from '../controllers/fetch-project-tasks-controller'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/tasks', createTaskController)
  app.get('/projects/:projectId/tasks', fetchProjectTasksController)
}
