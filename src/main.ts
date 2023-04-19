import helmet from 'helmet';

import morgan from 'morgan';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Set Up');
  // app.useWebSocketAdapter(new RedisIoAdapter(app));
  // setup swagger Docs if its on development server
  if (true) {
    logger.log('Running On Dev Env - Starting Swagger');
    configSwagger(app);
  }

  app.useGlobalPipes(new ValidationPipe());

  // Enable helmet middleware
  app.use(helmet());

  // Enable CORS
  app.enableCors({ origin: true, credentials: true });

  app.use(morgan('dev'));

  logger.log(`Proxy Token Backend Server is running on port ${3000}`);
  await app.listen(3000);
}
bootstrap();
