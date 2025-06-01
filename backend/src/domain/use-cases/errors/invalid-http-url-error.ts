import { BadRequestError } from '@/core/errors/bad-request-error'

export class InvalidHttpUrlError extends BadRequestError {
  constructor(url: string) {
    super()
    this.message = `"${url}" is not a valid HTTP URL`
  }
}
