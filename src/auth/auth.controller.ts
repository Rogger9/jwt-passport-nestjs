import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
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
}
