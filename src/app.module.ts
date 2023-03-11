import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import config from './config'
import database from './config/database'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config, database] }), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
