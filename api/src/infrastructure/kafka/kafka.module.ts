import { Module, Global } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaConfigService } from '../../config/kafka.config';
import { Kafka, Producer } from 'kafkajs';

/**
 * Módulo de infraestructura para la configuración y provisión del cliente Kafka.
 * Este módulo expone el Producer de Kafka como servicio inyectable en la capa de aplicación.
 * La configuración de conexión se centraliza en KafkaConfigService y se inyecta por constructor.
 */
@Global()
@Module({
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaConfigService: KafkaConfigService): Promise<Producer> => {
        const saslMechanism = process.env.KAFKA_SASL_MECHANISM;
        let sasl: { mechanism: 'plain'; username: string; password: string; } | 
             { mechanism: 'scram-sha-256'; username: string; password: string; } | 
             { mechanism: 'scram-sha-512'; username: string; password: string; } | 
             undefined;

        if (saslMechanism === 'plain') {
          sasl = {
            mechanism: 'plain',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
          };
        } else if (saslMechanism === 'scram-sha-256') {
          sasl = {
            mechanism: 'scram-sha-256',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
          };
        } else if (saslMechanism === 'scram-sha-512') {
          sasl = {
            mechanism: 'scram-sha-512',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
          };
        }

        const kafka = new Kafka({
          clientId: 'order-events-api',
          brokers: kafkaConfigService.getBrokers(),
          ssl: process.env.KAFKA_SSL === 'true',
          sasl: sasl,
          connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT || '3000', 10),
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
        });
        const producer = kafka.producer();
        await producer.connect();
        return producer;
      },
      inject: [KafkaConfigService],
    },
    KafkaProducerService,
  ],
  exports: [KafkaProducerService, 'KAFKA_PRODUCER'],
})
export class KafkaModule {}