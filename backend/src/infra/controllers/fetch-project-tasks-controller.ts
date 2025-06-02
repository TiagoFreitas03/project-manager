import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchProjectTasksUseCase } from '../factories/make-fetch-project-tasks-use-case'
import { TaskPresenter } from '../presenters/task-presenter'

export async function fetchProjectTasksController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchProjectTasksParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = fetchProjectTasksParamsSchema.parse(request.params)

  const fetchProjectTasksUseCase = makeFetchProjectTasksUseCase()

  const result = await fetchProjectTasksUseCase.execute({ projectId })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    tasks: result.value.tasks.map(TaskPresenter.toHTTP),
  })
}
