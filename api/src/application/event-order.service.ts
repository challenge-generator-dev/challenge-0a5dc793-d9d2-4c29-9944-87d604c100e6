import { Injectable, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { KafkaProducerService } from '../infrastructure/kafka/kafka-producer.service';
import { EventOrder, OrderStatus } from '../domain/event-order.model';
import { PublishOrderUpdateDto } from '../domain/event-order.model';
import { KafkaConfigService } from '../config/kafka.config';
import { Subject, Observable } from 'rxjs';

export interface OrderEvent {
  id: string;
  status: string;
  date: Date;
}

@Injectable()
export class EventOrderService {
  private readonly logger = new Logger(EventOrderService.name);
  private readonly eventSubject = new Subject<OrderEvent>();

  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    private readonly kafkaConfigService: KafkaConfigService,
  ) {}

  async publishOrderUpdate(orderId: string, dto: PublishOrderUpdateDto): Promise<{ message: string }> {
    this.logger.log(`Publicando actualización para orden ${orderId} con estado ${dto.status}`);

    if (!this.isValidOrderStatus(dto.status)) {
      throw new HttpException(
        `Estado de orden inválido: ${dto.status}. Estados válidos: PENDIENTE, CONFIRMADA, EN_PROCESO, ENVIADA, ENTREGADA, CANCELADA`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const statusEnum = dto.status as OrderStatus;
    const eventOrder = await this.kafkaProducer.publishOrderUpdate(orderId, statusEnum, new Date(dto.date));

    this.eventSubject.next({
      id: eventOrder.id,
      status: eventOrder.status,
      date: eventOrder.date,
    });

    this.logger.log(`Evento publicado exitosamente para orden ${orderId}`);
    return { message: 'Evento publicado exitosamente' };
  }

  streamOrderUpdates(): Observable<OrderEvent> {
    this.logger.log('Iniciando stream de eventos de órdenes');
    return this.eventSubject.asObservable();
  }

  private isValidOrderStatus(status: string): boolean {
    const validStatuses = ['PENDIENTE', 'CONFIRMADA', 'EN_PROCESO', 'ENVIADA', 'ENTREGADA', 'CANCELADA'];
    return validStatuses.includes(status.toUpperCase());
  }

  onModuleDestroy() {
    this.eventSubject.complete();
    this.logger.log('Subject de eventos completado');
  }
}