import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = signal('Order Tracking Client');
  isMenuOpen = signal(true);
  currentYear = new Date().getFullYear();
  currentRoute = signal('');

  readonly navItems = [
    { label: 'Seguimiento de Órdenes', route: '/orders', icon: 'local_shipping' },
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Configuración', route: '/settings', icon: 'settings' }
  ];

  readonly appVersion = '1.0.0';
  readonly environment = signal<'development' | 'production'>('development');

  constructor() {
    this.environment.set(this.getEnvironment());
  }

  ngOnInit(): void {
    this.initializeApp();
    this.setupRouteTracking();
  }

  private initializeApp(): void {
    console.log(`[${this.title()}] Iniciando aplicación en modo ${this.environment()}`);
    this.validateRequiredProviders();
  }

  private getEnvironment(): 'development' | 'production' {
    return window.location.hostname === 'localhost' ? 'development' : 'production';
  }

  private validateRequiredProviders(): void {
    if (typeof EventSource === 'undefined') {
      console.warn('EventSource no disponible. Los eventos SSE no funcionarán.');
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute() === route;
  }

  onRouteChange(route: string): void {
    this.currentRoute.set(route);
    console.log(`Navegando a: ${route}`);
  }

  getCopyrightText(): string {
    return `© ${this.currentYear} Order Tracking System. v${this.appVersion}`;
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isMenuOpen()) {
      this.toggleMenu();
    }
  }
}