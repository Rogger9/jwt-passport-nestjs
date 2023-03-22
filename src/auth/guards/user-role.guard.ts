import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { User } from 'src/users/entities/user.entity'
import { META_ROLES } from '../decorators'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req: Request = ctx.switchToHttp().getRequest()
    const validRoles: string[] = this.reflector.get(META_ROLES, ctx.getHandler())
    const user = req.user as User

    if (!user) throw new BadRequestException('User not found')

    const isValid = !!validRoles.find(el => user.roles.includes(el))

    if (!isValid)
      throw new ForbiddenException(`User ${user.name} need a valid role: [${validRoles}]`)

    return true
  }
}
