# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Consumo y publicación de eventos en Kafka**.

| | |
|---|---|
| Tema | Consumo de eventos en tiempo real con Kafka |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 |
| Patron arquitectonico | Patrón contenedor/presentacional con Signals para manejo de estado reactivo |
| Tiempo estimado | 4 horas |

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | Apache Kafka |
| `client` | `client/` | chapter, support | client | Angular | Angular |
| `infra-local` | (raiz) | support | infra | Compose local | Apache Kafka |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd api && npm install && npm run build` — componente `api` (practice).
3. `cd client && npm install && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /api/orders/:id/status`
  - `GET /api/orders/events`
- `client` expone http (api: http://localhost:3000):
  - `GET http://localhost:3000/api/orders/events (SSE)`

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.0.0
- @angular/common 20.0.0
- @angular/platform-browser 20.0.0
- @angular/platform-browser-dynamic 20.0.0
- @angular/router 20.0.0
- @angular/material 20.0.0
- @angular/cdk 20.0.0
- rxjs 7.8.1
- zone.js 0.14.2
- @angular/compiler 20.0.0
- @angular/cli n/a
- jest-preset-angular 14.0.3

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial del entorno Kafka**: Entorno Kafka local con el topic 'ordenes-estado' configurado y accesible.
- **Fase 2 — Publicación de eventos en Kafka**: Servicio que publica eventos de actualización de órdenes en el topic Kafka 'ordenes-estado'.
- **Fase 3 — Consumo de eventos en Kafka**: Servicio que consume eventos del topic Kafka 'ordenes-estado' y actualiza la interfaz de usuario en tiempo real.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (11)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.filterByStatus`
      Se invoca `filterByStatus` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.filteredOrders`
      Se invoca `filteredOrders` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.isConnected`
      Se invoca `isConnected` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.onSearch`
      Se invoca `onSearch` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.clearSearch`
      Se invoca `clearSearch` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.searchQuery`
      Se invoca `searchQuery` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.totalOrders`
      Se invoca `totalOrders` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.pendingCount`
      Se invoca `pendingCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.processingCount`
      Se invoca `processingCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.shippedCount`
      Se invoca `shippedCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.deliveredCount`
      Se invoca `deliveredCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (35)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/domain/event-order.model.ts`
- `api/src/main.ts`
- `api/src/app.module.ts`
- `api/src/application/event-order.service.ts`
- `api/src/infrastructure/kafka/kafka.module.ts`
- `api/src/infrastructure/kafka/kafka-producer.service.ts`
- `api/src/infrastructure/http/event-order.controller.ts`
- `api/src/config/kafka.config.ts`
- `api/src/common/exceptions/http-exception.filter.ts`
- `client/package.json`
- `client/angular.json`
- `client/src/main.ts`
- `client/src/app/core/models/order-event.model.ts`
- `client/tsconfig.json`
- `client/src/index.html`
- `client/src/app/app.component.ts`
- `client/src/app/app.config.ts`
- `client/src/app/app.routes.ts`
- `client/src/app/features/order-tracking/order-tracking.component.ts`
- `client/src/app/features/order-tracking/order-tracking.component.html`
- `client/src/app/features/order-tracking/order-tracking.component.scss`
- `client/src/app/shared/components/order-status-card/order-status-card.component.ts`
- `client/src/app/services/order-event.service.ts`
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts`
- `client/setup-jest.ts`
- `client/src/app/core/store/order-event.reducer.ts`
- `client/src/app/core/store/order-event.effects.ts`
- `client/tsconfig.app.json`
- `client/tsconfig.spec.json`
- `client/src/setup-jest.ts`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/kafka/create-topics.sh`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `api`
- `api/src/domain`
- `api/src/application`
- `api/src/infrastructure`
- `api/src/config`
- `api/src/common`
- `client`
- `client/src/app/core`
- `client/src/app/features/order-tracking`
- `client/src/app/shared`
- `client/src/app/services`

## Verificacion

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **Patrón contenedor/presentacional con Signals para manejo de estado reactivo**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2
- Brecha que el reto ataca: Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real (corrida e2e 20261109213213585), Publica y consume eventos de un topic Kafka y refleja los mensajes en la interfaz
- Mision: Mostrar en vivo el estado de las ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
