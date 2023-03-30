import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator'
import { expressions } from 'src/utils/contants/expressions'
import { PASSWORD_DTO } from 'src/utils/contants/messages'

export class CreateUserDto {
  @ApiProperty({ description: 'User email (unique)', required: true, minLength: 1 })
  @IsEmail()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Matches(expressions.password, { message: PASSWORD_DTO })
  password: string

  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string
}
