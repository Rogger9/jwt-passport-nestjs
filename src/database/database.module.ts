import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        useUnifiedTopology: config.get('config.isMongo'),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
