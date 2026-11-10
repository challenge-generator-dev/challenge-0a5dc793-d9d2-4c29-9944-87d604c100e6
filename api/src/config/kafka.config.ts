import { Kafka, Producer, Consumer, logLevel, logCreator, KafkaConfig as KafkaClientConfig, LogEntry } from 'kafkajs';

const DEFAULT_BROKERS = ['localhost:9092'];
const DEFAULT_TOPIC = 'ordenes-estado';
const DEFAULT_GROUP_ID = 'order-events-consumer-group';

export const KAFKA_CONFIG = 'KAFKA_CONFIG';

export interface KafkaConnectionConfig {
  brokers: string[];
  topic: string;
  clientId: string;
  groupId: string;
  acks?: number;
  sendTimeout?: number;
}

export class KafkaConfigService {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private readonly config: KafkaConnectionConfig;

  constructor() {
    const brokersEnv = this.getEnvVar('KAFKA_BROKERS', DEFAULT_BROKERS.join(','));
    this.config = {
      brokers: this.parseBrokers(brokersEnv),
      topic: this.getEnvVar('KAFKA_TOPIC', DEFAULT_TOPIC),
      clientId: this.getEnvVar('KAFKA_CLIENT_ID', 'order-events-api'),
      groupId: this.getEnvVar('KAFKA_GROUP_ID', DEFAULT_GROUP_ID),
      acks: parseInt(this.getEnvVar('KAFKA_PRODUCER_ACKS', '1'), 10),
      sendTimeout: parseInt(this.getEnvVar('KAFKA_PRODUCER_TIMEOUT', '30000'), 10),
    };

    const kafkaLogCreator: logCreator = (logLevelValue: logLevel) => {
      return (entry: LogEntry) => {
        const message = entry.log.message || '';
        const logArgs = entry.log.args || [];
        switch (logLevelValue) {
          case logLevel.ERROR:
            console.error('[Kafka Error]', message, ...logArgs);
            break;
          case logLevel.WARN:
            console.warn('[Kafka Warn]', message, ...logArgs);
            break;
          case logLevel.INFO:
            console.log('[Kafka Info]', message, ...logArgs);
            break;
          case logLevel.DEBUG:
            console.debug('[Kafka Debug]', message, ...logArgs);
            break;
        }
      };
    };

    const kafkaConfig: KafkaClientConfig = {
      clientId: this.config.clientId,
      brokers: this.config.brokers,
      logLevel: logLevel.WARN,
      logCreator: kafkaLogCreator,
      retry: {
        initialRetryTime: 300,
        retries: 8,
      },
    };

    this.kafka = new Kafka(kafkaConfig);
  }

  private getEnvVar(name: string, defaultValue: string): string {
    const value = process.env[name];
    if (!value || value.trim() === '') {
      return defaultValue;
    }
    return value.trim();
  }

  private parseBrokers(brokersEnv: string): string[] {
    return brokersEnv.split(',').map(b => b.trim()).filter(b => b.length > 0);
  }

  getTopic(): string {
    return this.config.topic;
  }

  getGroupId(): string {
    return this.config.groupId;
  }

  getBrokers(): string[] {
    return this.config.brokers;
  }

  getAcks(): number {
    return this.config.acks ?? 1;
  }

  getSendTimeout(): number {
    return this.config.sendTimeout ?? 30000;
  }

  async connect(): Promise<void> {
    try {
      this.producer = this.kafka.producer();
      await this.producer.connect();
      console.log('Kafka producer connected successfully');
    } catch (error) {
      console.error('Failed to connect Kafka producer:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.producer) {
        await this.producer.disconnect();
        console.log('Kafka producer disconnected');
      }
      if (this.consumer) {
        await this.consumer.disconnect();
        console.log('Kafka consumer disconnected');
      }
    } catch (error) {
      console.error('Error disconnecting Kafka:', error);
      throw error;
    }
  }

  getProducer(): Producer {
    if (!this.producer) {
      throw new Error('Kafka producer not initialized. Call connect() first.');
    }
    return this.producer;
  }

  async createConsumer(): Promise<Consumer> {
    if (this.consumer) {
      return this.consumer;
    }

    try {
      this.consumer = this.kafka.consumer({ groupId: this.config.groupId });
      await this.consumer.connect();
      console.log('Kafka consumer connected successfully');
      return this.consumer;
    } catch (error) {
      console.error('Failed to connect Kafka consumer:', error);
      throw error;
    }
  }

  async subscribeToTopic(topic: string, fromBeginning: boolean = false): Promise<void> {
    if (!this.consumer) {
      await this.createConsumer();
    }
    await this.consumer!.subscribe({ topic, fromBeginning });
    console.log(`Subscribed to Kafka topic: ${topic}`);
  }

  async sendMessage(topic: string, messages: Array<{ key?: string; value: string; headers?: Record<string, string> }>): Promise<void> {
    if (!this.producer) {
      throw new Error('Kafka producer not initialized. Call connect() first.');
    }

    try {
      await this.producer.send({
        topic,
        messages: messages.map(msg => ({
          key: msg.key,
          value: msg.value,
          headers: msg.headers,
        })),
      });
    } catch (error) {
      console.error('Failed to send message to Kafka:', error);
      throw error;
    }
  }

  async sendOrderEvent(orderId: string, status: string, date: Date): Promise<void> {
    const eventPayload = JSON.stringify({
      id: orderId,
      status,
      date: date.toISOString(),
    });

    await this.sendMessage(this.config.topic, [
      {
        key: orderId,
        value: eventPayload,
        headers: {
          'content-type': 'application/json',
          'event-type': 'order-status-update',
        },
      },
    ]);

    console.log(`Order event sent: orderId=${orderId}, status=${status}, topic=${this.config.topic}`);
  }

  isConnected(): boolean {
    return this.producer !== null;
  }
}

export const kafkaConfigService = new KafkaConfigService();

export { KafkaClientConfig as KafkaConfig };