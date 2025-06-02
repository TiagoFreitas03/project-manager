import { FastifyInstance } from 'fastify'
import { createTaskController } from '../controllers/create-task-controller'
import { fetchProjectTasksController } from '../controllers/fetch-project-tasks-controller'
import { getTaskByIdController } from '../controllers/get-task-by-id-controller'
import { editTaskController } from '../controllers/edit-task-controller'
import { updateTaskStatusController } from '../controllers/update-task-status-controller'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/tasks', createTaskController)
  app.get('/projects/:projectId/tasks', fetchProjectTasksController)
  app.get('/tasks/:taskId', getTaskByIdController)
  app.put('/tasks/:taskId', editTaskController)
  app.patch('/tasks/:taskId/status', updateTaskStatusController)
}
