import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginationDto } from 'src/common/dtos'
import { Repository } from 'typeorm'
import { UpdateUserDto } from './dtos'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException(`User with id ${id} not found`)
    return user
  }

  async find({ limit = 10, offset = 0 }: PaginationDto) {
    return await this.userRepository.find({ take: limit, skip: offset })
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id)
    const user = await this.userRepository.preload({ id, ...data })
    return await this.userRepository.save(user)
  }

  async delete(id: string) {
    const user = await this.findOne(id)
    return await this.userRepository.remove(user)
  }
}
