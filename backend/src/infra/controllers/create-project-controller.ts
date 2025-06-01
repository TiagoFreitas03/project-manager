import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateProjectUseCase } from '../factories/make-create-project-use-case'

export async function createProjectController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createProjectBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    repositoryUrl: z.string().url(),
  })

  const { name, description, repositoryUrl } = createProjectBodySchema.parse(
    request.body,
  )

  const createProjectUseCase = makeCreateProjectUseCase()

  const result = await createProjectUseCase.execute({
    name,
    description,
    repositoryUrl,
  })

  if (result.isLeft()) {
    throw result.value
  }

  return reply.status(201).send()
}
