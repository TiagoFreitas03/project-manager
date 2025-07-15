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

  const fetchProjectTasksQuerySchema = z.object({
    archived: z
      .string()
      .optional()
      .default('false')
      .transform((arg) => arg === 'true'),
  })

  const { archived } = fetchProjectTasksQuerySchema.parse(request.query)

  const fetchProjectTasksUseCase = makeFetchProjectTasksUseCase()

  const result = await fetchProjectTasksUseCase.execute({ projectId, archived })

  if (result.isLeft()) {
    throw result.value
  }

  const { tasks } = result.value

  return reply.status(200).send({
    toDoTasks: tasks
      .filter((task) => task.status === 'TO_DO')
      .map(TaskPresenter.toHTTP),
    doingTasks: tasks
      .filter((task) => task.status === 'DOING')
      .map(TaskPresenter.toHTTP),
    doneTasks: tasks
      .filter((task) => task.status === 'DONE')
      .map(TaskPresenter.toHTTP),
  })
}
