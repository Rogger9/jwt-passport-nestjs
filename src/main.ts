import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './utils/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const logger = new Logger('Main')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  app.useGlobalFilters(new HttpExceptionFilter())

  const configService = app.get(ConfigService)

  const config = new DocumentBuilder()
    .setTitle('Jwt api')
    .setDescription('Jwt endpoints')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const PORT = configService.get('config.port')
  await app.listen(PORT)
  logger.log(`App running on port ${PORT}`)
}
bootstrap()
