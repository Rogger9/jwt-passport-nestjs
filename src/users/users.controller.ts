import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query } from '@nestjs/common'
import { PaginationDto } from 'src/common/dtos'
import { UpdateUserDto } from './dtos'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  find(@Query() pag: PaginationDto) {
    return this.usersService.find(pag)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id)
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(id, data)
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id)
  }
}
