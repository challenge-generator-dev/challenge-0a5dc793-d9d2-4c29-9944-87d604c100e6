import { Injectable, Inject, OnModuleInit, OnModuleDestroy, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KafkaConfigService } from '../../config/kafka.config';
import { EventOrder, OrderStatus } from '../../domain/event-order.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;
  private readonly topicName: string;
  private readonly acks: number;
  private readonly sendTimeout: number;
  private isConnected = false;

  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaProducer: Producer,
    private readonly kafkaConfigService: KafkaConfigService,
  ) {
    this.producer = this.kafkaProducer;
    this.topicName = this.kafkaConfigService.getTopic();
    this.acks = this.kafkaConfigService.getAcks();
    this.sendTimeout = this.kafkaConfigService.getSendTimeout();
  }

  async onModuleInit(): Promise<void> {
    this.logger.log(`Inicializando KafkaProducerService para topic: ${this.topicName}`);
    this.isConnected = true;
    this.logger.log('Kafka producer conectado y listo para publicar eventos');
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Cerrando conexión del producer de Kafka');
    if (this.producer && this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      this.logger.log('Conexión de Kafka cerrada correctamente');
    }
  }

  async publishOrderUpdate(orderId: string, status: OrderStatus, date: Date): Promise<EventOrder> {
    if (!this.isConnected) {
      this.logger.error('Kafka producer no está conectado');
      throw new HttpException(
        'El servicio de mensajería no está disponible',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const eventId = uuidv4();
    const eventOrder = new EventOrder(orderId, status, date);

    const record: ProducerRecord = {
      topic: this.topicName,
      messages: [
        {
          key: orderId,
          value: JSON.stringify({
            eventId,
            orderId: eventOrder.id,
            status: eventOrder.status,
            date: eventOrder.date.toISOString(),
            timestamp: Date.now(),
          }),
          headers: {
            'content-type': 'application/json',
            'event-type': 'ORDER_STATUS_UPDATE',
          },
        },
      ],
      acks: this.acks,
      timeout: this.sendTimeout,
    };

    try {
      await this.producer.send(record);
      this.logger.log(`Evento publicado: orderId=${orderId}, status=${status}, topic=${this.topicName}`);
      return eventOrder;
    } catch (error) {
      this.logger.error(`Error al publicar evento para orden ${orderId}: ${error.message}`, error.stack);
      throw new HttpException(
        `Error al publicar el evento: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async send(topic: string, messages: Array<{ key?: string; value: string }>): Promise<void> {
    if (!this.isConnected) {
      throw new HttpException(
        'El servicio de mensajería no está disponible',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    await this.producer.send({
      topic,
      messages,
    });
  }

  isProducerConnected(): boolean {
    return this.isConnected;
  }
}