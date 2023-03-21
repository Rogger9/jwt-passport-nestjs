import { PickType } from '@nestjs/mapped-types'
import { CreateUserDto } from '.'

export class LoginDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}
