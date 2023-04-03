import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { CommonService } from 'src/common/common.service'
import { CommonResponse } from 'src/common/interfaces'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { CreateUserDto, LoginDto } from './dtos'
import { ILoginResponse, ITokens } from './interfaces'
import { JwtPayload } from './interfaces/payload.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly commonService: CommonService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

  async login({ email, password }: LoginDto): CommonResponse<ILoginResponse> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    })
    const isValidHash = user && (await this.commonService.isValidHash(password, user.password))

    if (!user || !isValidHash) throw new UnauthorizedException('Invalid credentials')

    delete user.password

    return {
      statusCode: HttpStatus.OK,
      data: {
        user,
        tokens: await this.generateTokens({ id: user.id }),
      },
    }
  }

  async refresh(id: string): CommonResponse<ITokens> {
    const tokens = await this.generateTokens({ id })

    return {
      statusCode: HttpStatus.OK,
      data: tokens,
    }
  }

  private async generateTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: this.configService.get('config.jwtAccess'),
        expiresIn: '2h',
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get('config.jwtRefresh'),
        expiresIn: '1d',
      }),
    ])

    return { accessToken, refreshToken }
  }

  private getToken(payload: JwtPayload) {
    return this.jwtService.sign(payload)
  }
}
