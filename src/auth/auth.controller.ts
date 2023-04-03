import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags } from '@nestjs/swagger'
import { User } from 'src/users/entities/user.entity'
import { AuthService } from './auth.service'
import { Auth, GetUser, RawHeaders } from './decorators'
import { CreateUserDto, LoginDto } from './dtos'
import { Strategies, ValidRoles } from './interfaces'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() user: CreateUserDto) {
    return this.authService.create(user)
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data)
  }

  @Get('refresh')
  @UseGuards(AuthGuard(Strategies.REFRESH))
  refresh(@GetUser('id') id: string) {
    return this.authService.refresh(id)
  }

  @Get('private')
  @UseGuards(AuthGuard())
  private(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return { message: 'Private', user, email, rawHeaders }
  }

  @Get('private-roles')
  @Auth(ValidRoles.ADMIN)
  privateRoles(@GetUser() user: User) {
    return { message: 'Private roles', user }
  }
}
