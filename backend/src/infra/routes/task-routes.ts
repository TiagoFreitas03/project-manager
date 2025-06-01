import { FastifyInstance } from 'fastify'
import { createTaskController } from '../controllers/create-task-controller'

export async function taskRoutes(app: FastifyInstance) {
  app.post('/tasks', createTaskController)
}
