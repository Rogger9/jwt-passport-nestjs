import { Inject, Injectable } from '@nestjs/common'
import { PaginationDto } from 'src/common/application/dtos/pagination.dto'
import { ICommonRepository, ICommonRepositoryToken } from 'src/common/application/interfaces'
import { IUser } from '../domain/user.entity'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject(ICommonRepositoryToken)
    private readonly userRepository: ICommonRepository<IUser>,
  ) {}

  async create(data: CreateUserDto) {
    const user = await this.userRepository.create(data)
    return user
  }

  async find(pag?: PaginationDto) {
    return await this.userRepository.find(pag)
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.userRepository.update(id, data)
  }

  async delete(id: string) {
    return await this.userRepository.delete(id)
  }
}
