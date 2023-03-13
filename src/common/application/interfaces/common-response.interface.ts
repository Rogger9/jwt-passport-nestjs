import { HttpStatus } from '@nestjs/common'

export interface ICommonResponse<T = unknown> {
  statusCode: HttpStatus
  message?: string
  error?: string
  data?: T
}

export type CommonResponse<T = unknown> = Promise<ICommonResponse<T>>
