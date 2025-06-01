import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetProjectBySlugUseCase } from '../factories/make-get-project-by-slug-use-case'
import { ProjectPresenter } from '../presenters/project-presenter'

export async function getProjectBySlugController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProjectBySlugParamsSchema = z.object({
    slug: z.string(),
  })

  const { slug } = getProjectBySlugParamsSchema.parse(request.params)

  const getProjectBySlugUseCase = makeGetProjectBySlugUseCase()

  const result = await getProjectBySlugUseCase.execute({ slug })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    project: ProjectPresenter.toHTTP(result.value.project),
  })
}
