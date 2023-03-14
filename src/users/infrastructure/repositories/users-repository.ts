import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ICommonRepository, PaginationDto } from 'src/common/application'
import { CreateUserDto, UpdateUserDto } from 'src/users/application'
import { User } from '../entities/user.entity'

@Injectable()
export class UsersRepository implements ICommonRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find({ limit = 50, offset = 0 }: PaginationDto) {
    return await this.userRepository.find({ take: limit, skip: offset })
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException(`Usuarion con ${id} no fue encontrado`)
    return user
  }

  async create(data: CreateUserDto) {
    const user = this.userRepository.create(data)
    return await this.save(user)
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id)
    const user = await this.userRepository.preload({ id, ...data })
    return await this.save(user)
  }

  async delete(id: string) {
    const user = await this.findOne(id)
    await this.userRepository.remove(user)
    return await this.userRepository.find()
  }

  async save(data: User) {
    return await this.userRepository.save(data)
  }
}
