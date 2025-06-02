import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { TaskPresenter } from '../presenters/task-presenter'
import { makeUpdateTaskStatusUseCase } from '../factories/make-update-task-status-use-case'

export async function updateTaskStatusController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateTaskStatusParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = updateTaskStatusParamsSchema.parse(request.params)

  const updateTaskStatusBodySchema = z.object({
    status: z.enum(['TO_DO', 'DOING', 'DONE']),
  })

  const { status } = updateTaskStatusBodySchema.parse(request.body)

  const updateTaskStatusUseCase = makeUpdateTaskStatusUseCase()

  const result = await updateTaskStatusUseCase.execute({ taskId, status })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    task: TaskPresenter.toHTTP(result.value.task),
  })
}
