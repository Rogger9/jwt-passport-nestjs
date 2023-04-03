import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonService } from 'src/common/common.service'
import { User } from 'src/users/entities/user.entity'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Strategies } from './interfaces'
import { JwtAccessStrategy, JwtRefreshStrategy } from './strategies'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: Strategies.ACCESS }),
    JwtModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, CommonService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [TypeOrmModule, PassportModule, JwtModule, JwtAccessStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
