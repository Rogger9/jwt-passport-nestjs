import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config, { database } from './config'
import { validationSchema } from './config/env.validation'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config, database], validationSchema }),
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
