import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, fromEvent, merge, of, timer } from 'rxjs';
import { map, takeUntil, retry, catchError, tap, filter, switchMap, shareReplay, finalize } from 'rxjs/operators';
import { OrderEvent } from '../core/models/order-event.model';

@Injectable({
  providedIn: 'root'
})
export class OrderEventService implements OnDestroy {
  private readonly API_BASE = 'http://localhost:3000';
  private readonly EVENTS_ENDPOINT = `${this.API_BASE}/api/orders/events`;
  
  private destroy$ = new Subject<void>();
  private eventSource: EventSource | null = null;
  private connectionStatus$ = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');
  
  private ordersMap = new Map<string, OrderEvent>();
  private ordersSubject$ = new BehaviorSubject<OrderEvent[]>([]);
  
  readonly isConnected = computed(() => this.connectionStatus$.value === 'connected');
  readonly connectionStatus = this.connectionStatus$.asObservable();
  readonly orders$ = this.ordersSubject$.asObservable();
  
  readonly pendingOrders = computed(() => 
    Array.from(this.ordersMap.values()).filter(o => o.status.toLowerCase() === 'pending')
  );
  
  readonly processingOrders = computed(() => 
    Array.from(this.ordersMap.values()).filter(o => o.status.toLowerCase() === 'processing')
  );
  
  readonly shippedOrders = computed(() => 
    Array.from(this.ordersMap.values()).filter(o => o.status.toLowerCase() === 'shipped')
  );
  
  readonly deliveredOrders = computed(() => 
    Array.from(this.ordersMap.values()).filter(o => o.status.toLowerCase() === 'delivered')
  );
  
  readonly orderCount = computed(() => this.ordersMap.size);
  
  constructor(private http: HttpClient) {
    this.initializeEventListeners();
  }
  
  private initializeEventListeners(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.reconnect());
      window.addEventListener('offline', () => this.disconnect());
    }
  }
  
  connect(): void {
    if (this.eventSource) {
      return;
    }
    
    this.connectionStatus$.next('connecting');
    
    try {
      const headers = new HttpHeaders({
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache'
      });
      
      this.eventSource = new EventSource(this.EVENTS_ENDPOINT, { withCredentials: true });
      
      this.eventSource.onopen = () => {
        console.log('[OrderEventService] Conexión SSE establecida');
        this.connectionStatus$.next('connected');
      };
      
      this.eventSource.onmessage = (event) => {
        try {
          const data: OrderEvent = JSON.parse(event.data);
          this.handleOrderEvent(data);
        } catch (error) {
          console.error('[OrderEventService] Error al parsear evento:', error);
        }
      };
      
      this.eventSource.onerror = (error) => {
        console.error('[OrderEventService] Error en conexión SSE:', error);
        this.connectionStatus$.next('disconnected');
        this.handleConnectionError();
      };
      
    } catch (error) {
      console.error('[OrderEventService] Error al crear EventSource:', error);
      this.connectionStatus$.next('disconnected');
    }
  }
  
  private handleOrderEvent(event: OrderEvent): void {
    const normalizedEvent: OrderEvent = {
      ...event,
      date: new Date(event.date)
    };
    
    this.ordersMap.set(normalizedEvent.id, normalizedEvent);
    this.ordersSubject$.next(Array.from(this.ordersMap.values()));
    
    console.log(`[OrderEventService] Evento recibido: Orden #${normalizedEvent.id} - ${normalizedEvent.status}`);
  }
  
  private handleConnectionError(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    
    timer(3000).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      console.log('[OrderEventService] Intentando reconectar...');
      this.connect();
    });
  }
  
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.connectionStatus$.next('disconnected');
      console.log('[OrderEventService] Desconectado del stream SSE');
    }
  }
  
  reconnect(): void {
    this.disconnect();
    this.connect();
  }
  
  getOrderById(id: string): OrderEvent | undefined {
    return this.ordersMap.get(id);
  }
  
  clearOrders(): void {
    this.ordersMap.clear();
    this.ordersSubject$.next([]);
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.disconnect();
  }
}