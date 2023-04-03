import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/users/entities'
import { UsersService } from 'src/users/users.service'
import { JwtPayload } from '../interfaces'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly usersService: UsersService,
    protected readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('config.jwtRefresh'),
      ignoreExpiration: false,
    })
  }

  async validate({ id }: JwtPayload): Promise<User> {
    const user = await this.usersService.findOne(id)

    if (!user) throw new UnauthorizedException('Token not valid')

    return user
  }
}
