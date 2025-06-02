import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetTaskByIdUseCase } from '../factories/make-get-task-by-id-use-case'
import { TaskPresenter } from '../presenters/task-presenter'

export async function getTaskByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTaskByIdParams = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = getTaskByIdParams.parse(request.params)

  const getTaskByIdUseCase = makeGetTaskByIdUseCase()

  const result = await getTaskByIdUseCase.execute({ taskId })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    task: TaskPresenter.toHTTP(result.value.task),
  })
}
