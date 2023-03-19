import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonService } from 'src/common/common.service'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { LoginDto } from './dtos/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
  ) {}

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true },
      })
      const isValidHash = await this.commonService.isValidHash(password, user.password)

      return user
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials')
    }
  }
}
