import { Injectable } from '@angular/core';

/**
 * Modelo que representa un evento de actualización de estado de una orden.
 * Este modelo se utiliza tanto para enviar eventos al backend como para recibir
 * eventos a través de Server-Sent Events (SSE).
 */
export interface OrderEvent {
  /**
   * Identificador único de la orden.
   */
  id: string;

  /**
   * Estado actual de la orden.
   * Ejemplos: 'CREATED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'
   */
  status: string;

  /**
   * Fecha y hora en que ocurrió la actualización del estado.
   * Se espera un objeto Date válido.
   */
  date: Date;
}