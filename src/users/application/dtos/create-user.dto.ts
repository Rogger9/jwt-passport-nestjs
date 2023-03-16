import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { expressions } from 'src/utils/contants/expressions'
import { PASSWORD_DTO } from 'src/utils/contants/messages'
import { IUser } from '../../domain'

export class CreateUserDto implements IUser {
  @IsEmail()
  @IsString()
  email: string

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(expressions.password, { message: PASSWORD_DTO })
  password: string

  @IsString()
  @MinLength(1)
  name: string
}
