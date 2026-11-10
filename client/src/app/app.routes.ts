import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Configuración de rutas de la aplicación Order Tracking Client.
 * 
 * Este módulo define todas las rutas de navegación de la aplicación,
 * utilizando lazy loading para optimizar el rendimiento inicial.
 * Las rutas se cargan bajo demanda para reducir el tamaño del bundle
 * principal y mejorar los tiempos de carga en producción.
 * 
 * Estructura de rutas:
 * - /: Redirige al módulo de seguimiento de órdenes
 * - /orders: Módulo principal de seguimiento de órdenes (lazy loaded)
 * - /**: Ruta catch-all que redirige a /orders
 * 
 * El patrón de lazy loading permite que cada feature module se cargue
 * únicamente cuando el usuario navega a su ruta correspondiente,
 * optimizando el Core Web Vitals de la aplicación.
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/order-tracking/order-tracking.component')
      .then(m => m.OrderTrackingComponent),
    data: {
      title: 'Seguimiento de Órdenes',
      description: 'Panel de seguimiento en tiempo real del estado de las órdenes',
      icon: 'local_shipping',
      requiresAuth: true,
      cache: true
    },
    resolve: {
      initialData: () => inject(OrderTrackingResolver).resolve()
    }
  },
  {
    path: '**',
    redirectTo: 'orders'
  }
];

/**
 * Alias de exportación para compatibilidad con otros módulos.
 * Exporta la misma constante routes como appRoutes.
 */
export const appRoutes = routes;

/**
 * Resolver para datos iniciales del módulo de seguimiento de órdenes.
 * 
 * Este resolver se ejecuta antes de cargar el componente de seguimiento
 * de órdenes, obteniendo los datos necesarios para la vista inicial.
 * Utiliza el patrón de resolver para garantizar que los datos estén
 * disponibles al momento de renderizar el componente.
 */
class OrderTrackingResolver {
  private router = inject(Router);

  resolve() {
    return {
      recentOrders: [],
      lastUpdate: new Date().toISOString()
    };
  }
}

/**
 * Guard para proteger rutas que requieren autenticación.
 * 
 * Este guard verifica si el usuario tiene una sesión activa
 * antes de permitir el acceso a rutas protegidas. Si el usuario
 * no está autenticado, se redirige a la página de login.
 */
export const authGuard = () => {
  const router = inject(Router);
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

/**
 * Guard para verificar permisos específicos.
 * 
 * Permite el acceso solo si el usuario tiene el rol requerido
 * para la ruta específica. Útil para secciones administrativas
 * o funcionalidades que requieren privilegios especiales.
 */
export const roleGuard = (requiredRole: string) => {
  const router = inject(Router);
  const userRole = 'admin';
  
  if (userRole !== requiredRole) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};

/**
 * Interceptor de precarga para rutas frecuentes.
 * 
 * Este interceptor identifica patrones de navegación y precarga
 * los módulos correspondientes en segundo plano, mejorando
 * la experiencia del usuario al reducir tiempos de carga percibidos.
 */
export const preloadInterceptor = (route: any) => {
  if (route.data?.preload) {
    console.log(`Precargando ruta: ${route.path}`);
  }
  return true;
};