import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { OrderTrackingComponent } from './order-tracking.component';
import { OrderEventService } from '../../services/order-event.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OrderEvent } from '../../core/models/order-event.model';
import { BehaviorSubject } from 'rxjs';

describe('OrderTrackingComponent', () => {
  let component: OrderTrackingComponent;
  let fixture: ComponentFixture<OrderTrackingComponent>;
  let orderEventService: OrderEventService;
  let httpMock: HttpTestingController;

  const mockEvents: OrderEvent[] = [
    { id: 'ORD-001', status: 'pending', date: new Date('2024-01-15T10:00:00') },
    { id: 'ORD-002', status: 'processing', date: new Date('2024-01-15T11:00:00') },
    { id: 'ORD-003', status: 'shipped', date: new Date('2024-01-15T12:00:00') }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        OrderTrackingComponent,
        HttpClientTestingModule
      ],
      providers: [
        OrderEventService,
        provideAnimationsAsync()
      ]
    }).compileComponents();

    orderEventService = TestBed.inject(OrderEventService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería conectar al stream SSE al inicializar', fakeAsync(() => {
    const connectSpy = spyOn(orderEventService, 'connect');
    
    component.ngOnInit();
    tick();
    
    expect(connectSpy).toHaveBeenCalled();
  }));

  it('debería desconectar del stream SSE al destruir', fakeAsync(() => {
    const disconnectSpy = spyOn(orderEventService, 'disconnect');
    
    component.ngOnInit();
    component.ngOnDestroy();
    
    expect(disconnectSpy).toHaveBeenCalled();
  }));

  it('debería actualizar las órdenes cuando el servicio emite nuevos eventos', fakeAsync(() => {
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next(mockEvents);
    tick();
    
    expect(component.orders().length).toBe(3);
  }));

  it('debería filtrar órdenes por estado correctamente', fakeAsync(() => {
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next(mockEvents);
    tick();
    
    component.filterByStatus('pending');
    expect(component.filteredOrders().length).toBe(1);
    expect(component.filteredOrders()[0].id).toBe('ORD-001');
    
    component.filterByStatus('processing');
    expect(component.filteredOrders().length).toBe(1);
    expect(component.filteredOrders()[0].id).toBe('ORD-002');
    
    component.filterByStatus('shipped');
    expect(component.filteredOrders().length).toBe(1);
    expect(component.filteredOrders()[0].id).toBe('ORD-003');
    
    component.filterByStatus('all');
    expect(component.filteredOrders().length).toBe(3);
  }));

  it('debería mostrar estado de conexión correctamente', fakeAsync(() => {
    const connectionSubject = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');
    spyOn(orderEventService, 'connectionStatus').and.returnValue(connectionSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    connectionSubject.next('connected');
    tick();
    
    expect(component.isConnected()).toBe(true);
    
    connectionSubject.next('disconnected');
    tick();
    
    expect(component.isConnected()).toBe(false);
  }));

  it('debería manejar errores de conexión SSE', fakeAsync(() => {
    const consoleSpy = spyOn(console, 'error');
    const reconnectSpy = spyOn(orderEventService, 'reconnect');
    
    component.ngOnInit();
    tick();
    
    expect(reconnectSpy).toHaveBeenCalled();
  }));

  it('debería buscar órdenes por ID', fakeAsync(() => {
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next(mockEvents);
    tick();
    
    component.searchQuery.set('ORD-001');
    component.onSearch();
    
    expect(component.filteredOrders().length).toBe(1);
    expect(component.filteredOrders()[0].id).toBe('ORD-001');
  }));

  it('debería limpiar la búsqueda y mostrar todas las órdenes', fakeAsync(() => {
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next(mockEvents);
    tick();
    
    component.searchQuery.set('ORD-001');
    component.onSearch();
    expect(component.filteredOrders().length).toBe(1);
    
    component.clearSearch();
    expect(component.filteredOrders().length).toBe(3);
    expect(component.searchQuery()).toBe('');
  }));

  it('debería actualizar el estado de conexión en la UI', fakeAsync(() => {
    const connectionSubject = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('connecting');
    spyOn(orderEventService, 'connectionStatus').and.returnValue(connectionSubject.asObservable());
    
    component.ngOnInit();
    fixture.detectChanges();
    
    connectionSubject.next('connected');
    tick();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const statusElement = compiled.querySelector('.connection-status');
    expect(statusElement?.textContent).toContain('Conectado');
  }));

  it('debería mostrar mensaje cuando no hay órdenes', fakeAsync(() => {
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next([]);
    tick();
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const noOrdersMessage = compiled.querySelector('.no-orders-message');
    expect(noOrdersMessage).toBeTruthy();
  }));

  it('debería calcular estadísticas correctamente', fakeAsync(() => {
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next(mockEvents);
    tick();
    
    expect(component.totalOrders()).toBe(3);
    expect(component.pendingCount()).toBe(1);
    expect(component.processingCount()).toBe(1);
    expect(component.shippedCount()).toBe(1);
    expect(component.deliveredCount()).toBe(0);
  }));

  it('debería ordenar órdenes por fecha descendente por defecto', fakeAsync(() => {
    const unsortedEvents: OrderEvent[] = [
      { id: 'ORD-003', status: 'delivered', date: new Date('2024-01-15T14:00:00') },
      { id: 'ORD-001', status: 'pending', date: new Date('2024-01-15T10:00:00') },
      { id: 'ORD-002', status: 'processing', date: new Date('2024-01-15T12:00:00') }
    ];
    
    const ordersSubject = new BehaviorSubject<OrderEvent[]>([]);
    spyOn(orderEventService, 'orders$').and.returnValue(ordersSubject.asObservable());
    
    component.ngOnInit();
    tick();
    
    ordersSubject.next(unsortedEvents);
    tick();
    
    expect(component.filteredOrders()[0].id).toBe('ORD-003');
    expect(component.filteredOrders()[1].id).toBe('ORD-002');
    expect(component.filteredOrders()[2].id).toBe('ORD-001');
  }));
});