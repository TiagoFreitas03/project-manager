import { FastifyInstance } from 'fastify'
import { createTaskController } from '../controllers/create-task-controller'
import { fetchProjectTasksController } from '../controllers/fetch-project-tasks-controller'
import { getTaskByIdController } from '../controllers/get-task-by-id-controller'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/tasks', createTaskController)
  app.get('/projects/:projectId/tasks', fetchProjectTasksController)
  app.get('/tasks/:taskId', getTaskByIdController)
}
