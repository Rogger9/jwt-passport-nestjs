import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { IUser } from '../../domain'

export class CreateUserDto implements IUser {
  @IsString()
  @IsOptional()
  fullName?: string

  @IsEmail()
  @IsString()
  email: string

  @IsString()
  @MinLength(3)
  password: string
}
