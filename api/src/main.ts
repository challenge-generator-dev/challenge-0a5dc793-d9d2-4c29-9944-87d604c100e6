import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { KafkaConfigService, kafkaConfigService } from './config/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await kafkaConfigService.connect();

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});