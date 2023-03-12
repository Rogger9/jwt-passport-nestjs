import { Injectable } from '@nestjs/common'
import { PaginationDto } from 'src/common/application/dtos/pagination.dto'
import { ICommonRepository } from 'src/common/application/interfaces'
import { CreateUserDto } from '../application/dtos/create-user.dto'
import { UpdateUserDto } from '../application/dtos/update-user.dto'
import { User } from './user.schema'

@Injectable()
export class UsersInMemory implements ICommonRepository<User> {
  private users: User[] = [{ id: 'uuid-1', email: 'asd', password: 'asd' }]

  async findOne(id: string) {
    return this.users.find(el => el.id === id)
  }

  async find({ limit = 5, offset = 0 }: PaginationDto) {
    const data = [...this.users]
    return data.slice(offset, limit)
  }

  async create(data: CreateUserDto) {
    const user: User = { id: Date.now().toString(), ...data }
    this.users.push(user)
    return user
  }

  async update(id: string, data: UpdateUserDto) {
    const user = this.users.find(el => el.id === id)
    const newUser: User = { ...user, ...data }
    this.users = this.users.map(el => (el.id === id ? newUser : el))
    return newUser
  }

  async delete(id: string) {
    this.users = this.users.filter(el => el.id !== id)
    return this.users
  }
}
