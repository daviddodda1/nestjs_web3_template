import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';

export function configSwagger(app: INestApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Proxy Token Backend')
    .setDescription('Proxy Token Backend API ')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AppModule, UsersModule],
  });

  SwaggerModule.setup('docs', app, document);
}
