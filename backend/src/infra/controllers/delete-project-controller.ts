import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteProjectUseCase } from '../factories/make-delete-project-use-case'

export async function deleteProjectController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProjectParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const { projectId } = deleteProjectParamsSchema.parse(request.params)

  const deleteProjectUseCase = makeDeleteProjectUseCase()

  const result = await deleteProjectUseCase.execute({ projectId })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(204).send()
}
