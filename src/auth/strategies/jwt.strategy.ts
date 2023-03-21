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
      secretOrKey: configService.get('jwtSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }

  async validate({ email }: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOneBy({ email })

    if (!user) throw new UnauthorizedException('Token not valid')
    if (!user.isActive) throw new UnauthorizedException('User is inactive')

    return user
  }
}
