import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { OrderEvent } from '../../../core/models/order-event.model';

@Component({
  selector: 'app-order-status-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card class="order-card" [class.updated]="isRecentlyUpdated">
      <mat-card-header>
        <mat-card-title>Orden #{{ order?.id }}</mat-card-title>
        <mat-card-subtitle>{{ order?.date | date:'medium' }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-chip-set>
          <mat-chip [class]="'status-chip status-' + order?.status">
            <mat-icon>{{ getStatusIcon() }}</mat-icon>
            {{ getStatusLabel() }}
          </mat-chip>
        </mat-chip-set>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .order-card {
      margin: 16px 0;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
      }
      
      &.updated {
        animation: pulse 0.5s ease-in-out;
      }
    }
    
    mat-card-header {
      margin-bottom: 12px;
    }
    
    mat-chip {
      display: flex;
      align-items: center;
      gap: 4px;
      
      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    }
    
    .status-chip {
      &.status-pending {
        background-color: #fff3e0;
        color: #e65100;
      }
      
      &.status-processing {
        background-color: #e3f2fd;
        color: #1565c0;
      }
      
      &.status-shipped {
        background-color: #f3e5f5;
        color: #7b1fa2;
      }
      
      &.status-delivered {
        background-color: #e8f5e9;
        color: #2e7d32;
      }
      
      &.status-cancelled {
        background-color: #ffebee;
        color: #c62828;
      }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderStatusCardComponent {
  @Input({ required: true }) order: OrderEvent | null = null;
  
  private readonly UPDATE_THRESHOLD_MS = 5000;
  
  get isRecentlyUpdated(): boolean {
    if (!this.order?.date) return false;
    const orderDate = new Date(this.order.date).getTime();
    const now = Date.now();
    return (now - orderDate) < this.UPDATE_THRESHOLD_MS;
  }
  
  getStatusIcon(): string {
    if (!this.order?.status) return 'help_outline';
    
    const statusIcons: Record<string, string> = {
      'pending': 'hourglass_empty',
      'processing': 'sync',
      'shipped': 'local_shipping',
      'delivered': 'check_circle',
      'cancelled': 'cancel'
    };
    
    return statusIcons[this.order.status.toLowerCase()] || 'help_outline';
  }
  
  getStatusLabel(): string {
    if (!this.order?.status) return 'Desconocido';
    
    const statusLabels: Record<string, string> = {
      'pending': 'Pendiente',
      'processing': 'Procesando',
      'shipped': 'Enviado',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    
    return statusLabels[this.order.status.toLowerCase()] || this.order.status;
  }
}