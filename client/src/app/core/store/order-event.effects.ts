import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, Observable, timer, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap, retry, delayWhen, takeUntil } from 'rxjs/operators';
import { OrderEventService } from '../../services/order-event.service';

export const ORDER_EVENTS_CONNECT = '[Order Events] Connect';
export const ORDER_EVENTS_DISCONNECT = '[Order Events] Disconnect';
export const ORDER_EVENTS_RECEIVED = '[Order Events] Received';
export const ORDER_EVENTS_ERROR = '[Order Events] Error';
export const ORDER_EVENTS_RETRY = '[Order Events] Retry';

export interface OrderEventAction {
  type: string;
  payload?: unknown;
}

export interface ConnectAction extends OrderEventAction {
  type: typeof ORDER_EVENTS_CONNECT;
}

export interface DisconnectAction extends OrderEventAction {
  type: typeof ORDER_EVENTS_DISCONNECT;
}

export interface ReceivedAction extends OrderEventAction {
  type: typeof ORDER_EVENTS_RECEIVED;
  payload: { event: import('../models/order-event.model').OrderEvent };
}

export interface ErrorAction extends OrderEventAction {
  type: typeof ORDER_EVENTS_ERROR;
  payload: { error: string };
}

export const connectOrderEvents = (): ConnectAction => ({ type: ORDER_EVENTS_CONNECT });
export const disconnectOrderEvents = (): DisconnectAction => ({ type: ORDER_EVENTS_DISCONNECT });
export const orderEventReceived = (event: import('../models/order-event.model').OrderEvent): ReceivedAction => ({
  type: ORDER_EVENTS_RECEIVED,
  payload: { event }
});
export const orderEventError = (error: string): ErrorAction => ({
  type: ORDER_EVENTS_ERROR,
  payload: { error }
});

@Injectable()
export class OrderEventEffects {
  private readonly actions$ = inject(Actions);
  private readonly orderEventService = inject(OrderEventService);

  connectToEventStream$: Observable<ReceivedAction | ErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(ORDER_EVENTS_CONNECT),
      switchMap(() =>
        new Observable<ReceivedAction | ErrorAction>(observer => {
          this.orderEventService.connect();
          
          const subscription = this.orderEventService.orders$.subscribe({
            next: (events) => {
              events.forEach(event => {
                observer.next(orderEventReceived(event));
              });
            },
            error: (err) => {
              observer.next(orderEventError(err.message || 'Connection failed'));
            }
          });

          return () => {
            subscription.unsubscribe();
            this.orderEventService.disconnect();
          };
        }).pipe(
          retry({
            count: 3,
            delay: (error, retryCount) => {
              console.warn(`Retry attempt ${retryCount} for SSE connection`);
              return timer(Math.min(1000 * Math.pow(2, retryCount), 10000));
            }
          }),
          catchError(error => of(orderEventError(error.message)))
        )
      )
    )
  );

  disconnectFromEventStream$: Observable<{ type: string }> = createEffect(() =>
    this.actions$.pipe(
      ofType(ORDER_EVENTS_DISCONNECT),
      tap(() => {
        this.orderEventService.disconnect();
      }),
      map(() => ({ type: ORDER_EVENTS_DISCONNECT }))
    )
  );

  handleConnectionError$: Observable<ErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(ORDER_EVENTS_ERROR),
      tap((action: ErrorAction) => {
        console.error('Order events error:', action.payload?.error);
      }),
      map((action: ErrorAction) => action)
    )
  );

  logConnectionAttempt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ORDER_EVENTS_CONNECT),
      tap(() => {
        console.log('Attempting to connect to SSE stream for order events');
      })
    ),
    { dispatch: false }
  );
}

export const ORDER_EVENTS_EFFECTS = [OrderEventEffects];