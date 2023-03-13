import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ICommonRepositoryToken } from 'src/common/application'
import { UsersService } from './application'
import { User, UsersController, UsersInMemory, UsersRepository } from './infrastructure'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    { provide: ICommonRepositoryToken, useClass: UsersInMemory },
  ],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
