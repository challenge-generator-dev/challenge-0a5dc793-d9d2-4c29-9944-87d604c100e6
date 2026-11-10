import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface KafkaErrorPayload {
  topic?: string;
  partition?: number;
  offset?: string;
  timestamp?: string;
  [key: string]: unknown;
}

interface ExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  method: string;
  details?: Record<string, unknown>;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: Record<string, unknown> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp.message as string) || message;
        error = (resp.error as string) || error;
        details = resp.details as Record<string, unknown> | undefined;
      }
    } else if (this.isKafkaError(exception)) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Kafka service unavailable';
      error = 'Kafka Error';
      details = this.extractKafkaErrorDetails(exception);
      this.logger.error(
        `Kafka error: ${message} - ${JSON.stringify(details)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else if (exception instanceof Error) {
      message = exception.message || message;
      this.logger.error(
        `Unhandled error: ${message}`,
        exception.stack,
      );

      if (this.isValidationError(exception)) {
        status = HttpStatus.BAD_REQUEST;
        error = 'Validation Error';
        details = { validationErrors: exception.message };
      } else if (this.isTimeoutError(exception)) {
        status = HttpStatus.GATEWAY_TIMEOUT;
        error = 'Gateway Timeout';
      }
    }

    const responseBody: ExceptionResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    if (details) {
      responseBody.details = details;
    }

    this.logger.log(
      `${request.method} ${request.url} -> ${status} [${error}]`,
    );

    response.status(status).json(responseBody);
  }

  private isKafkaError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    return (
      errorName.includes('kafka') ||
      errorMessage.includes('kafka') ||
      errorName.includes('broker') ||
      errorMessage.includes('broker') ||
      errorMessage.includes('producer') ||
      errorMessage.includes('consumer') ||
      errorName.includes('recordstobeproduced') ||
      errorName.includes('connection') ||
      errorMessage.includes('topic') ||
      errorMessage.includes('offset')
    );
  }

  private isValidationError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    return (
      errorName.includes('validation') ||
      errorMessage.includes('validation') ||
      errorName.includes('validator') ||
      errorMessage.includes('invalid') ||
      errorName.includes('badrequestexception')
    );
  }

  private isTimeoutError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    return (
      errorName.includes('timeout') ||
      errorMessage.includes('timeout') ||
      errorName.includes('etimedout')
    );
  }

  private extractKafkaErrorDetails(error: unknown): KafkaErrorPayload {
    const details: KafkaErrorPayload = {};

    if (error instanceof Error) {
      if (error.message.includes('topic=')) {
        const topicMatch = error.message.match(/topic=([^\s,]+)/);
        if (topicMatch) details.topic = topicMatch[1];
      }
      if (error.message.includes('partition=')) {
        const partitionMatch = error.message.match(/partition=(\d+)/);
        if (partitionMatch) details.partition = parseInt(partitionMatch[1], 10);
      }
      if (error.message.includes('offset=')) {
        const offsetMatch = error.message.match(/offset=(\d+)/);
        if (offsetMatch) details.offset = offsetMatch[1];
      }
      if (error.message.includes('timestamp=')) {
        const timestampMatch = error.message.match(/timestamp=([^\s,]+)/);
        if (timestampMatch) details.timestamp = timestampMatch[1];
      }
    }

    return details;
  }
}