import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderEventService } from '../../services/order-event.service';
import { OrderEvent } from '../../core/models/order-event.model';
import { OrderStatusCardComponent } from '../../shared/components/order-status-card/order-status-card.component';
import { Subscription } from 'rxjs';

interface OrderState {
  id: string;
  status: string;
  date: Date;
  lastUpdated: Date;
}

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    OrderStatusCardComponent
  ],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent implements OnInit, OnDestroy {
  private readonly orderEventService = inject(OrderEventService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly subscription = new Subscription();

  private readonly ordersMap = signal<Map<string, OrderState>>(new Map());

  readonly orders = computed(() => {
    const map = this.ordersMap();
    return Array.from(map.values()).sort((a, b) => 
      b.lastUpdated.getTime() - a.lastUpdated.getTime()
    );
  });

  readonly isConnected = signal<boolean>(false);
  readonly isLoading = signal<boolean>(true);
  readonly connectionError = signal<string | null>(null);

  readonly totalOrders = computed(() => this.orders().length);
  readonly pendingOrders = computed(() => 
    this.orders().filter(o => o.status === 'PENDING').length
  );
  readonly processingOrders = computed(() => 
    this.orders().filter(o => o.status === 'PROCESSING').length
  );
  readonly completedOrders = computed(() => 
    this.orders().filter(o => o.status === 'COMPLETED').length
  );

  ngOnInit(): void {
    this.connectToEventStream();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private connectToEventStream(): void {
    this.isLoading.set(true);
    this.connectionError.set(null);

    const eventSub = this.orderEventService.connect().subscribe({
      next: (event: OrderEvent) => {
        this.handleOrderEvent(event);
        this.isLoading.set(false);
      },
      error: (err: Error) => {
        this.handleConnectionError(err);
      },
      complete: () => {
        this.isConnected.set(false);
        this.isLoading.set(false);
      }
    });

    this.subscription.add(eventSub);
  }

  private handleOrderEvent(event: OrderEvent): void {
    this.isConnected.set(true);
    this.connectionError.set(null);

    this.ordersMap.update(map => {
      const newMap = new Map(map);
      const existingOrder = newMap.get(event.id);
      
      const orderState: OrderState = {
        id: event.id,
        status: event.status,
        date: new Date(event.date),
        lastUpdated: existingOrder?.lastUpdated || new Date()
      };
      
      if (!existingOrder) {
        this.showNotification(`Nueva orden recibida: ${event.id}`);
      } else if (existingOrder.status !== event.status) {
        this.showNotification(`Orden ${event.id} actualizada a ${event.status}`);
      }
      
      newMap.set(event.id, orderState);
      return newMap;
    });
  }

  private handleConnectionError(err: Error): void {
    this.isConnected.set(false);
    this.isLoading.set(false);
    this.connectionError.set(err.message || 'Error de conexión al servidor de eventos');
    
    this.snackBar.open(
      'Error de conexión. Reintentando automáticamente...',
      'Cerrar',
      { duration: 5000, panelClass: 'error-snackbar' }
    );
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    });
  }

  reconnect(): void {
    this.ordersMap.set(new Map());
    this.connectToEventStream();
  }

  clearOrders(): void {
    this.ordersMap.set(new Map());
    this.snackBar.open('Órdenes cleared', 'Aceptar', { duration: 2000 });
  }
}