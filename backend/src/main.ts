import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from '@/app.module'
import { LoggingService } from '@/logging/logging.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const loggingService = app.get(LoggingService)

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true
  })

  const config = new DocumentBuilder()
    .setTitle('Rural Producer API')
    .setDescription('API para gerenciamento de produtores rurais')
    .setVersion('1.0')
    .addTag('producers')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT || 3000
  await app.listen(port)
  loggingService.log(`Application is running on: http://localhost:${port}`)
}
void bootstrap()
