import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Main')

  const configService = app.get(ConfigService)

  const PORT = configService.get('config.port')
  await app.listen(PORT)
  logger.log(`App running on port ${PORT}`)
}
bootstrap()
