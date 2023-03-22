import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const RawHeaders = createParamDecorator((_, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest()
  const { rawHeaders } = req
  return rawHeaders
})
