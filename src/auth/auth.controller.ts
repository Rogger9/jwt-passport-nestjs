import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/users/entities/user.entity'
import { AuthService } from './auth.service'
import { GetUser, RawHeaders } from './decorators'
import { CreateUserDto, LoginDto } from './dtos'

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

  @Get('private')
  @UseGuards(AuthGuard())
  private(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @RawHeaders() rawHeaders: string[],
  ) {
    return { message: 'Private', user, email, rawHeaders }
  }
}
