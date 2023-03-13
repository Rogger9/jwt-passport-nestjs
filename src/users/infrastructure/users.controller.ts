import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common'
import { PaginationDto } from 'src/common/application'
import { CreateUserDto, UpdateUserDto, UsersService } from '../application'
import { UsersRepository } from './repositories/users-repository'

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersRepository)
    private usersService: UsersService,
  ) {}

  @Get()
  find(@Query() pag: PaginationDto) {
    return this.usersService.find(pag)
  }

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }
}
