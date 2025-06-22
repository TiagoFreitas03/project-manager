import { BadRequestError } from '@/core/errors/bad-request-error'

export class DuplicateProjectNameError extends BadRequestError {
  constructor(projectName: string) {
    super()
    this.message = `"A project named "${projectName}" already exists`
  }
}
