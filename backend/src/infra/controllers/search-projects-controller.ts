import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchProjectsUseCase } from '../factories/make-search-projects-use-case'
import { ProjectSummaryPresenter } from '../presenters/project-summary-presenter'

export async function searchProjectsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchProjectsQuerySchema = z.object({
    name: z.string().optional(),
    page: z.coerce.number().default(1),
    orderBy: z.enum(['name', 'createdAt', 'updatedAt']).default('name'),
    order: z.enum(['asc', 'desc']).default('asc'),
  })

  const { name, page, orderBy, order } = searchProjectsQuerySchema.parse(
    request.query,
  )

  const searchProjectsUseCase = makeSearchProjectsUseCase()

  const result = await searchProjectsUseCase.execute({
    name,
    page,
    orderBy,
    order,
  })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(200).send({
    projects: result.value.projects.map(ProjectSummaryPresenter.toHTTP),
    pages: result.value.pages,
  })
}
