import { PartialType } from '@nestjs/swagger'
import { CreateUserDto } from 'src/auth/dtos'

export class UpdateUserDto extends PartialType(CreateUserDto) {}
