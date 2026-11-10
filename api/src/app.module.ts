import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EventOrderController } from './infrastructure/http/event-order.controller';
import { EventOrderService } from './application/event-order.service';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [KafkaModule],
  controllers: [EventOrderController],
  providers: [
    EventOrderService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}