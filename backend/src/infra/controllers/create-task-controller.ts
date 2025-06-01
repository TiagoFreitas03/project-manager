import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '../factories/make-create-task-use-case'

export async function createTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTaskBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    priority: z.number(),
    projectId: z.string().uuid(),
  })

  const { name, description, priority, projectId } = createTaskBodySchema.parse(
    request.body,
  )

  const createTaskUseCase = makeCreateTaskUseCase()

  const result = await createTaskUseCase.execute({
    name,
    description,
    priority,
    projectId,
  })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(201).send()
}
