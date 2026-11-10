import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, Subject, map } from 'rxjs';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { KafkaConnectionConfig as KafkaConfig } from '../../config/kafka.config';
import { OrderStatus } from '../../domain/event-order.model';

/**
 * DTO para la solicitud de actualización de estado de orden.
 * Valida que el estado proporcionado sea uno de los valores permitidos del enum.
 */
export class UpdateOrderStatusDto {
  status: string;
  date: Date;
}

/**
 * Controlador HTTP que expone los endpoints para la gestión de eventos de órdenes.
 * Proporciona dos operaciones principales:
 * 1. POST /api/orders/:id/status - Publica una actualización de estado en Kafka
 * 2. GET /api/orders/events - Stream de eventos en tiempo real mediante Server-Sent Events
 * 
 * Este controlador actúa como la capa de interfaz (adapter) en la arquitectura hexagonal,
 * traduciendo las peticiones HTTP en llamadas al dominio y publicando eventos en Kafka.
 */
@Controller('orders')
export class EventOrderController {
  private readonly logger = new Logger(EventOrderController.name);
  private readonly eventSubject = new Subject<{ id: string; status: string; date: Date }>();
  private readonly eventObservers: Set<Response> = new Set();

  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly kafkaConfig: KafkaConfig,
  ) {}

  /**
   * Endpoint para publicar una actualización de estado de orden.
   * Valida el DTO recibido, publica el evento en Kafka y emite el evento a los clientes SSE conectados.
   * @param id - ID de la orden (parámetro de ruta)
   * @param updateDto - DTO con el nuevo estado y fecha
   * @returns 202 Accepted con el evento publicado
   */
  @Post(':id/status')
  @HttpCode(HttpStatus.ACCEPTED)
  async publishOrderUpdate(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrderStatusDto,
  ): Promise<{ message: string; event: { id: string; status: string; date: Date } }> {
    this.logger.log(`Recibida solicitud de actualización para orden: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    if (!updateDto.status) {
      throw new BadRequestException('El estado de la orden es obligatorio');
    }

    if (!updateDto.date) {
      throw new BadRequestException('La fecha de actualización es obligatoria');
    }

    const validStatuses = Object.values(OrderStatus);
    const statusValue = updateDto.status.toUpperCase();
    
    if (!validStatuses.includes(statusValue as OrderStatus)) {
      throw new BadRequestException(
        `Estado inválido. Estados permitidos: ${validStatuses.join(', ')}`,
      );
    }

    const parsedDate = new Date(updateDto.date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Formato de fecha inválido');
    }

    const orderStatus = statusValue as OrderStatus;
    const eventOrder = await this.kafkaProducerService.publishOrderUpdate(
      id,
      orderStatus,
      parsedDate,
    );

    const eventPayload = {
      id: eventOrder.id,
      status: eventOrder.status,
      date: eventOrder.date,
    };

    this.emitEventToSSE(eventPayload);

    this.logger.log(`Evento publicado correctamente para orden ${id}: ${orderStatus}`);

    return {
      message: 'Evento de actualización de orden publicado correctamente',
      event: eventPayload,
    };
  }

  /**
   * Endpoint de Server-Sent Events para transmitir eventos de órdenes en tiempo real.
   * Mantiene una conexión persistente con el cliente y envía eventos a medida que se publican.
   * El cliente debe manejar la reconexión automática en caso de desconexión.
   * @param res - Objeto Response de Express para enviar el stream SSE
   */
  @Get('events')
  streamOrderUpdates(@Res() res: Response): void {
    this.logger.log('Nueva conexión SSE establecida');

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    res.write('\n');

    const initialEvent = `data: ${JSON.stringify({ type: 'CONNECTION_ESTABLISHED', message: 'Conectado al stream de eventos de órdenes' })}\n\n`;
    res.write(initialEvent);

    this.eventObservers.add(res);

    const keepAliveInterval = setInterval(() => {
      if (res.writableEnded) {
        clearInterval(keepAliveInterval);
        return;
      }
      res.write(': keep-alive\n\n');
    }, 30000);

    res.on('close', () => {
      clearInterval(keepAliveInterval);
      this.eventObservers.delete(res);
      this.logger.log('Conexión SSE cerrada por el cliente');
    });

    res.on('error', (err) => {
      clearInterval(keepAliveInterval);
      this.eventObservers.delete(res);
      this.logger.error(`Error en conexión SSE: ${err.message}`);
    });
  }

  /**
   * Emite un evento a todos los clientes conectados mediante SSE.
   * @param event - Datos del evento a transmitir
   */
  private emitEventToSSE(event: { id: string; status: string; date: Date }): void {
    const eventData = `data: ${JSON.stringify(event)}\n\n`;

    for (const observer of this.eventObservers) {
      if (!observer.writableEnded) {
        try {
          observer.write(eventData);
        } catch (error) {
          this.logger.error(`Error al enviar evento a cliente SSE: ${error.message}`);
          this.eventObservers.delete(observer);
        }
      } else {
        this.eventObservers.delete(observer);
      }
    }
  }

  /**
   * Obtiene el número de clientes conectados al stream SSE.
   * Útil para métricas y monitoreo.
   * @returns Cantidad de clientes conectados
   */
  getConnectedClientsCount(): number {
    return this.eventObservers.size;
  }
}