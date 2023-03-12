import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CommonModule } from './common/common.module'
import config, { database } from './config'
import { validationSchema } from './config/env.validation'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config, database], validationSchema }),
    DatabaseModule,
    CommonModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
