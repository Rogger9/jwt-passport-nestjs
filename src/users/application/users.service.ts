import { HttpStatus, Inject, Injectable } from '@nestjs/common'
import {
  CommonResponse,
  ICommonRepository,
  ICommonRepositoryToken,
  PaginationDto,
} from 'src/common/application'
import type { IUser } from '../domain'
import { CreateUserDto, UpdateUserDto } from './dtos'

@Injectable()
export class UsersService {
  constructor(
    @Inject(ICommonRepositoryToken)
    private readonly userRepository: ICommonRepository<IUser>,
  ) {}

  async create(data: CreateUserDto): CommonResponse<IUser> {
    const user = await this.userRepository.create(data)
    return { statusCode: HttpStatus.CREATED, data: user }
  }

  async find(pag: PaginationDto) {
    return await this.userRepository.find(pag)
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.userRepository.update(id, data)
  }

  async delete(id: string) {
    return await this.userRepository.delete(id)
  }
}
