import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CommonService } from 'src/common/common.service'
import { User } from 'src/users/entities/user.entity'
import { CreateUserDto, LoginDto } from './dtos'
import { JwtPayload } from './interfaces/payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
  ) {}

  async create({ password, ...data }: CreateUserDto) {
    const hash = await this.commonService.hash(password)
    const user = this.userRepository.create({ ...data, password: hash })
    await this.userRepository.save(user)
    return {
      user,
      token: this.getToken({ id: user.id }),
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    })
    const isValidHash = user && (await this.commonService.isValidHash(password, user.password))

    if (!user || !isValidHash) throw new UnauthorizedException('Invalid credentials')

    return {
      user,
      token: this.getToken({ id: user.id }),
    }
  }

  private getToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }
}
