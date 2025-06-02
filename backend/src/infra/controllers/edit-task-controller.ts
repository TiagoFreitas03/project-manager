import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEditTaskUseCase } from '../factories/make-edit-task-use-case'
import { TaskPresenter } from '../presenters/task-presenter'

export async function editTaskController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const editTaskBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    priority: z.number(),
  })

  const { taskId } = editTaskParamsSchema.parse(request.params)

  const { name, description, priority } = editTaskBodySchema.parse(request.body)

  const editTaskUseCase = makeEditTaskUseCase()

  const result = await editTaskUseCase.execute({
    taskId,
    name,
    description,
    priority,
  })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    task: TaskPresenter.toHTTP(result.value.task),
  })
}
