import { PickType } from '@nestjs/mapped-types'
import { CreateUserDto } from 'src/users/dtos'

export class LoginDto extends PickType(CreateUserDto, ['email', 'password'] as const) {}
