import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { PaginationDto } from 'src/common/application/dtos/pagination.dto'
import { CreateUserDto } from '../application/dtos/create-user.dto'
import { UpdateUserDto } from '../application/dtos/update-user.dto'
import { UsersService } from '../application/users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  find(@Query() pag?: PaginationDto) {
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
