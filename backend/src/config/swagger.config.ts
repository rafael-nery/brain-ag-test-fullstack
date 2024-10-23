import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Rural Producer API')
    .setDescription('API para gerenciamento de produtores rurais')
    .setVersion('1.0')
    .addTag('producers')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)
}
