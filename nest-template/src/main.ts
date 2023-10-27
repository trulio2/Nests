import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();

  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
}
bootstrap();
