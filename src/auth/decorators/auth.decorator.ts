import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RoleProtected } from '.'
import { UserRoleGuard } from '../guards/user-role.guard'
import { ValidRoles } from '../interfaces'

export const Auth = (...roles: ValidRoles[]) =>
  applyDecorators(RoleProtected(...roles), UseGuards(AuthGuard(), UserRoleGuard))
