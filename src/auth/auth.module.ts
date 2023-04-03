import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonService } from 'src/common/common.service'
import { User } from 'src/users/entities/user.entity'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtAccessStrategy, JwtRefreshStrategy, JwtStrategy } from './strategies'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('config.jwtSecret'),
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CommonService, JwtStrategy, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [TypeOrmModule, PassportModule, JwtModule, JwtStrategy],
})
export class AuthModule {}
