import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum OrderStatus {
  CREATED = 'CREATED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class EventOrder {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDate()
  date: Date;

  constructor(id: string, status: OrderStatus, date: Date) {
    this.id = id;
    this.status = status;
    this.date = date;
  }
}

export class PublishOrderUpdateDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDate()
  date: Date;
}