import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from 'src/auth/dtos'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
