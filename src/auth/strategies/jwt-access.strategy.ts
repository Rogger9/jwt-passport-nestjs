import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/users/entities'
import { UsersService } from 'src/users/users.service'
import { JwtPayload, Strategies } from '../interfaces'

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, Strategies.ACCESS) {
  constructor(
    private readonly usersService: UsersService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('config.jwtAccess'),
      ignoreExpiration: false,
    })
  }

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne(id)

    if (!user) throw new UnauthorizedException('Token not valid')

    return user
  }
}
