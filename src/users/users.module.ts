import { Module } from '@nestjs/common'
import { ICommonRepositoryToken } from 'src/common/application/interfaces'
import { UsersService } from './application/users.service'
import { UsersInMemory } from './infrastructure/user-in-memory'
import { UsersController } from './infrastructure/users.controller'

@Module({
  controllers: [UsersController],
  providers: [UsersService, { provide: ICommonRepositoryToken, useClass: UsersInMemory }],
  exports: [UsersService],
})
export class UsersModule {}
