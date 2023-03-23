import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/users/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtPayload } from '../interfaces/payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('config.jwtSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })

    const errorMsg = !user ? 'Token not valid' : 'User is inactive'
    if (!user || !user.isActive) throw new UnauthorizedException(errorMsg)

    return user
  }
}
