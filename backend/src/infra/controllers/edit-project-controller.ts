import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEditProjectUseCase } from '../factories/make-edit-project-use-case'
import { ProjectPresenter } from '../presenters/project-presenter'

export async function editProjectController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const editProjectParamsSchema = z.object({
    projectId: z.string().uuid(),
  })

  const editProjectBodySchema = z.object({
    description: z.string(),
    repositoryUrl: z.string().url(),
  })

  const { projectId } = editProjectParamsSchema.parse(request.params)

  const { description, repositoryUrl } = editProjectBodySchema.parse(
    request.body,
  )

  const editProjectUseCase = makeEditProjectUseCase()

  const result = await editProjectUseCase.execute({
    projectId,
    description,
    repositoryUrl,
  })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    project: ProjectPresenter.toHTTP(result.value.project),
  })
}
