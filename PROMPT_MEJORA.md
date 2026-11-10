# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

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

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.filterByStatus`: Se invoca `filterByStatus` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.filteredOrders`: Se invoca `filteredOrders` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.isConnected`: Se invoca `isConnected` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.onSearch`: Se invoca `onSearch` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.clearSearch`: Se invoca `clearSearch` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.searchQuery`: Se invoca `searchQuery` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.totalOrders`: Se invoca `totalOrders` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.pendingCount`: Se invoca `pendingCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.processingCount`: Se invoca `processingCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.shippedCount`: Se invoca `shippedCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `client/src/app/features/order-tracking/order-tracking.component.spec.ts` — `OrderTrackingComponent.deliveredCount`: Se invoca `deliveredCount` sobre `OrderTrackingComponent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced L2

### Brecha de conocimiento
Publicar y consumir eventos en un topic Kafka y mostrarlos en tiempo real (corrida e2e 20261109213213585), Publica y consume eventos de un topic Kafka y refleja los mensajes en la interfaz

### Misión / candidato
Mostrar en vivo el estado de las ordenes

### Reto
- Tema: Consumo de eventos en tiempo real con Kafka
- Seniority: advanced-l2
- Tipo: practical
- Título: Consumo y publicación de eventos en Kafka
- Tiempo estimado: 4 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial del entorno Kafka — objetivo: Configurar un entorno Kafka local para pruebas y desarrollo. — entregable (NO resolver): Entorno Kafka local con el topic 'ordenes-estado' configurado y accesible.
- Fase 2: Publicación de eventos en Kafka — objetivo: Implementar la funcionalidad para publicar eventos de actualización de órdenes en el topic Kafka. — entregable (NO resolver): Servicio que publica eventos de actualización de órdenes en el topic Kafka 'ordenes-estado'.
- Fase 3: Consumo de eventos en Kafka — objetivo: Implementar la funcionalidad para consumir eventos de Kafka y reflejarlos en la interfaz de usuario. — entregable (NO resolver): Servicio que consume eventos del topic Kafka 'ordenes-estado' y actualiza la interfaz de usuario en tiempo real.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "order-events-api",
  "version": "1.0.0",
  "description": "Microservicio para publicación y consumo de eventos de órdenes en Kafka",
  "main": "dist/main.js",
  "scripts": {
    "build": "tsc",
    "format": "prettier --write 'src/**/*.ts'",
    "start": "node dist/main.js",
    "start:dev": "nest start --watch",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/microservices": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "class-validator": "^0.14.0",
    "kafkajs": "^2.2.4",
    "reflect-metadata": "^0.2.1",
    "rxjs": "^7.8.1",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@nestjs/testing": "^11.0.0",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.12",
    "@types/node": "^20.11.19",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^9.0.8",
    "jest": "^29.7.0",
    "prettier": "^3.2.5",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.3.3"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "es2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  },
  "exclude": ["node_modules", "dist"]
}

// === ARCHIVO: api/src/domain/event-order.model.ts ===
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

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { KafkaConfigService, kafkaConfigService } from './config/kafka.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await kafkaConfigService.connect();

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap().catch(err => {
  console.error('Failed to start application:', err);
  process.exit(1);
});

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { EventOrderController } from './infrastructure/http/event-order.controller';
import { EventOrderService } from './application/event-order.service';
import { KafkaModule } from './infrastructure/kafka/kafka.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [KafkaModule],
  controllers: [EventOrderController],
  providers: [
    EventOrderService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/application/event-order.service.ts ===
import { Injectable, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { KafkaProducerService } from '../infrastructure/kafka/kafka-producer.service';
import { EventOrder, OrderStatus } from '../domain/event-order.model';
import { PublishOrderUpdateDto } from '../domain/event-order.model';
import { KafkaConfigService } from '../config/kafka.config';
import { Subject, Observable } from 'rxjs';

export interface OrderEvent {
  id: string;
  status: string;
  date: Date;
}

@Injectable()
export class EventOrderService {
  private readonly logger = new Logger(EventOrderService.name);
  private readonly eventSubject = new Subject<OrderEvent>();

  constructor(
    private readonly kafkaProducer: KafkaProducerService,
    private readonly kafkaConfigService: KafkaConfigService,
  ) {}

  async publishOrderUpdate(orderId: string, dto: PublishOrderUpdateDto): Promise<{ message: string }> {
    this.logger.log(`Publicando actualización para orden ${orderId} con estado ${dto.status}`);

    if (!this.isValidOrderStatus(dto.status)) {
      throw new HttpException(
        `Estado de orden inválido: ${dto.status}. Estados válidos: PENDIENTE, CONFIRMADA, EN_PROCESO, ENVIADA, ENTREGADA, CANCELADA`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const statusEnum = dto.status as OrderStatus;
    const eventOrder = await this.kafkaProducer.publishOrderUpdate(orderId, statusEnum, new Date(dto.date));

    this.eventSubject.next({
      id: eventOrder.id,
      status: eventOrder.status,
      date: eventOrder.date,
    });

    this.logger.log(`Evento publicado exitosamente para orden ${orderId}`);
    return { message: 'Evento publicado exitosamente' };
  }

  streamOrderUpdates(): Observable<OrderEvent> {
    this.logger.log('Iniciando stream de eventos de órdenes');
    return this.eventSubject.asObservable();
  }

  private isValidOrderStatus(status: string): boolean {
    const validStatuses = ['PENDIENTE', 'CONFIRMADA', 'EN_PROCESO', 'ENVIADA', 'ENTREGADA', 'CANCELADA'];
    return validStatuses.includes(status.toUpperCase());
  }

  onModuleDestroy() {
    this.eventSubject.complete();
    this.logger.log('Subject de eventos completado');
  }
}

// === ARCHIVO: api/src/infrastructure/kafka/kafka.module.ts ===
import { Module, Global } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { KafkaConfigService } from '../../config/kafka.config';
import { Kafka, Producer } from 'kafkajs';

/**
 * Módulo de infraestructura para la configuración y provisión del cliente Kafka.
 * Este módulo expone el Producer de Kafka como servicio inyectable en la capa de aplicación.
 * La configuración de conexión se centraliza en KafkaConfigService y se inyecta por constructor.
 */
@Global()
@Module({
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaConfigService: KafkaConfigService): Promise<Producer> => {
        const saslMechanism = process.env.KAFKA_SASL_MECHANISM;
        let sasl: { mechanism: 'plain'; username: string; password: string; } | 
             { mechanism: 'scram-sha-256'; username: string; password: string; } | 
             { mechanism: 'scram-sha-512'; username: string; password: string; } | 
             undefined;

        if (saslMechanism === 'plain') {
          sasl = {
            mechanism: 'plain',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
          };
        } else if (saslMechanism === 'scram-sha-256') {
          sasl = {
            mechanism: 'scram-sha-256',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
          };
        } else if (saslMechanism === 'scram-sha-512') {
          sasl = {
            mechanism: 'scram-sha-512',
            username: process.env.KAFKA_SASL_USERNAME || '',
            password: process.env.KAFKA_SASL_PASSWORD || '',
          };
        }

        const kafka = new Kafka({
          clientId: 'order-events-api',
          brokers: kafkaConfigService.getBrokers(),
          ssl: process.env.KAFKA_SSL === 'true',
          sasl: sasl,
          connectionTimeout: parseInt(process.env.KAFKA_CONNECTION_TIMEOUT || '3000', 10),
          retry: {
            initialRetryTime: 100,
            retries: 8,
          },
        });
        const producer = kafka.producer();
        await producer.connect();
        return producer;
      },
      inject: [KafkaConfigService],
    },
    KafkaProducerService,
  ],
  exports: [KafkaProducerService, 'KAFKA_PRODUCER'],
})
export class KafkaModule {}

// === ARCHIVO: api/src/infrastructure/kafka/kafka-producer.service.ts ===
import { Injectable, Inject, OnModuleInit, OnModuleDestroy, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { KafkaConfigService } from '../../config/kafka.config';
import { EventOrder, OrderStatus } from '../../domain/event-order.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaProducerService.name);
  private producer: Producer;
  private readonly topicName: string;
  private readonly acks: number;
  private readonly sendTimeout: number;
  private isConnected = false;

  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaProducer: Producer,
    private readonly kafkaConfigService: KafkaConfigService,
  ) {
    this.producer = this.kafkaProducer;
    this.topicName = this.kafkaConfigService.getTopic();
    this.acks = this.kafkaConfigService.getAcks();
    this.sendTimeout = this.kafkaConfigService.getSendTimeout();
  }

  async onModuleInit(): Promise<void> {
    this.logger.log(`Inicializando KafkaProducerService para topic: ${this.topicName}`);
    this.isConnected = true;
    this.logger.log('Kafka producer conectado y listo para publicar eventos');
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Cerrando conexión del producer de Kafka');
    if (this.producer && this.isConnected) {
      await this.producer.disconnect();
      this.isConnected = false;
      this.logger.log('Conexión de Kafka cerrada correctamente');
    }
  }

  async publishOrderUpdate(orderId: string, status: OrderStatus, date: Date): Promise<EventOrder> {
    if (!this.isConnected) {
      this.logger.error('Kafka producer no está conectado');
      throw new HttpException(
        'El servicio de mensajería no está disponible',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const eventId = uuidv4();
    const eventOrder = new EventOrder(orderId, status, date);

    const record: ProducerRecord = {
      topic: this.topicName,
      messages: [
        {
          key: orderId,
          value: JSON.stringify({
            eventId,
            orderId: eventOrder.id,
            status: eventOrder.status,
            date: eventOrder.date.toISOString(),
            timestamp: Date.now(),
          }),
          headers: {
            'content-type': 'application/json',
            'event-type': 'ORDER_STATUS_UPDATE',
          },
        },
      ],
      acks: this.acks,
      timeout: this.sendTimeout,
    };

    try {
      await this.producer.send(record);
      this.logger.log(`Evento publicado: orderId=${orderId}, status=${status}, topic=${this.topicName}`);
      return eventOrder;
    } catch (error) {
      this.logger.error(`Error al publicar evento para orden ${orderId}: ${error.message}`, error.stack);
      throw new HttpException(
        `Error al publicar el evento: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async send(topic: string, messages: Array<{ key?: string; value: string }>): Promise<void> {
    if (!this.isConnected) {
      throw new HttpException(
        'El servicio de mensajería no está disponible',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    await this.producer.send({
      topic,
      messages,
    });
  }

  isProducerConnected(): boolean {
    return this.isConnected;
  }
}

// === ARCHIVO: api/src/infrastructure/http/event-order.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, Subject, map } from 'rxjs';
import { KafkaProducerService } from '../kafka/kafka-producer.service';
import { KafkaConnectionConfig as KafkaConfig } from '../../config/kafka.config';
import { OrderStatus } from '../../domain/event-order.model';

/**
 * DTO para la solicitud de actualización de estado de orden.
 * Valida que el estado proporcionado sea uno de los valores permitidos del enum.
 */
export class UpdateOrderStatusDto {
  status: string;
  date: Date;
}

/**
 * Controlador HTTP que expone los endpoints para la gestión de eventos de órdenes.
 * Proporciona dos operaciones principales:
 * 1. POST /api/orders/:id/status - Publica una actualización de estado en Kafka
 * 2. GET /api/orders/events - Stream de eventos en tiempo real mediante Server-Sent Events
 * 
 * Este controlador actúa como la capa de interfaz (adapter) en la arquitectura hexagonal,
 * traduciendo las peticiones HTTP en llamadas al dominio y publicando eventos en Kafka.
 */
@Controller('orders')
export class EventOrderController {
  private readonly logger = new Logger(EventOrderController.name);
  private readonly eventSubject = new Subject<{ id: string; status: string; date: Date }>();
  private readonly eventObservers: Set<Response> = new Set();

  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly kafkaConfig: KafkaConfig,
  ) {}

  /**
   * Endpoint para publicar una actualización de estado de orden.
   * Valida el DTO recibido, publica el evento en Kafka y emite el evento a los clientes SSE conectados.
   * @param id - ID de la orden (parámetro de ruta)
   * @param updateDto - DTO con el nuevo estado y fecha
   * @returns 202 Accepted con el evento publicado
   */
  @Post(':id/status')
  @HttpCode(HttpStatus.ACCEPTED)
  async publishOrderUpdate(
    @Param('id') id: string,
    @Body() updateDto: UpdateOrderStatusDto,
  ): Promise<{ message: string; event: { id: string; status: string; date: Date } }> {
    this.logger.log(`Recibida solicitud de actualización para orden: ${id}`);

    if (!id || id.trim() === '') {
      throw new BadRequestException('El ID de la orden es obligatorio');
    }

    if (!updateDto.status) {
      throw new BadRequestException('El estado de la orden es obligatorio');
    }

    if (!updateDto.date) {
      throw new BadRequestException('La fecha de actualización es obligatoria');
    }

    const validStatuses = Object.values(OrderStatus);
    const statusValue = updateDto.status.toUpperCase();
    
    if (!validStatuses.includes(statusValue as OrderStatus)) {
      throw new BadRequestException(
        `Estado inválido. Estados permitidos: ${validStatuses.join(', ')}`,
      );
    }

    const parsedDate = new Date(updateDto.date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Formato de fecha inválido');
    }

    const orderStatus = statusValue as OrderStatus;
    const eventOrder = await this.kafkaProducerService.publishOrderUpdate(
      id,
      orderStatus,
      parsedDate,
    );

    const eventPayload = {
      id: eventOrder.id,
      status: eventOrder.status,
      date: eventOrder.date,
    };

    this.emitEventToSSE(eventPayload);

    this.logger.log(`Evento publicado correctamente para orden ${id}: ${orderStatus}`);

    return {
      message: 'Evento de actualización de orden publicado correctamente',
      event: eventPayload,
    };
  }

  /**
   * Endpoint de Server-Sent Events para transmitir eventos de órdenes en tiempo real.
   * Mantiene una conexión persistente con el cliente y envía eventos a medida que se publican.
   * El cliente debe manejar la reconexión automática en caso de desconexión.
   * @param res - Objeto Response de Express para enviar el stream SSE
   */
  @Get('events')
  streamOrderUpdates(@Res() res: Response): void {
    this.logger.log('Nueva conexión SSE establecida');

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
    });

    res.write('\n');

    const initialEvent = `data: ${JSON.stringify({ type: 'CONNECTION_ESTABLISHED', message: 'Conectado al stream de eventos de órdenes' })}\n\n`;
    res.write(initialEvent);

    this.eventObservers.add(res);

    const keepAliveInterval = setInterval(() => {
      if (res.writableEnded) {
        clearInterval(keepAliveInterval);
        return;
      }
      res.write(': keep-alive\n\n');
    }, 30000);

    res.on('close', () => {
      clearInterval(keepAliveInterval);
      this.eventObservers.delete(res);
      this.logger.log('Conexión SSE cerrada por el cliente');
    });

    res.on('error', (err) => {
      clearInterval(keepAliveInterval);
      this.eventObservers.delete(res);
      this.logger.error(`Error en conexión SSE: ${err.message}`);
    });
  }

  /**
   * Emite un evento a todos los clientes conectados mediante SSE.
   * @param event - Datos del evento a transmitir
   */
  private emitEventToSSE(event: { id: string; status: string; date: Date }): void {
    const eventData = `data: ${JSON.stringify(event)}\n\n`;

    for (const observer of this.eventObservers) {
      if (!observer.writableEnded) {
        try {
          observer.write(eventData);
        } catch (error) {
          this.logger.error(`Error al enviar evento a cliente SSE: ${error.message}`);
          this.eventObservers.delete(observer);
        }
      } else {
        this.eventObservers.delete(observer);
      }
    }
  }

  /**
   * Obtiene el número de clientes conectados al stream SSE.
   * Útil para métricas y monitoreo.
   * @returns Cantidad de clientes conectados
   */
  getConnectedClientsCount(): number {
    return this.eventObservers.size;
  }
}

// === ARCHIVO: api/src/config/kafka.config.ts ===
import { Kafka, Producer, Consumer, logLevel, logCreator, KafkaConfig as KafkaClientConfig, LogEntry } from 'kafkajs';

const DEFAULT_BROKERS = ['localhost:9092'];
const DEFAULT_TOPIC = 'ordenes-estado';
const DEFAULT_GROUP_ID = 'order-events-consumer-group';

export const KAFKA_CONFIG = 'KAFKA_CONFIG';

export interface KafkaConnectionConfig {
  brokers: string[];
  topic: string;
  clientId: string;
  groupId: string;
  acks?: number;
  sendTimeout?: number;
}

export class KafkaConfigService {
  private kafka: Kafka;
  private producer: Producer | null = null;
  private consumer: Consumer | null = null;
  private readonly config: KafkaConnectionConfig;

  constructor() {
    const brokersEnv = this.getEnvVar('KAFKA_BROKERS', DEFAULT_BROKERS.join(','));
    this.config = {
      brokers: this.parseBrokers(brokersEnv),
      topic: this.getEnvVar('KAFKA_TOPIC', DEFAULT_TOPIC),
      clientId: this.getEnvVar('KAFKA_CLIENT_ID', 'order-events-api'),
      groupId: this.getEnvVar('KAFKA_GROUP_ID', DEFAULT_GROUP_ID),
      acks: parseInt(this.getEnvVar('KAFKA_PRODUCER_ACKS', '1'), 10),
      sendTimeout: parseInt(this.getEnvVar('KAFKA_PRODUCER_TIMEOUT', '30000'), 10),
    };

    const kafkaLogCreator: logCreator = (logLevelValue: logLevel) => {
      return (entry: LogEntry) => {
        const message = entry.log.message || '';
        const logArgs = entry.log.args || [];
        switch (logLevelValue) {
          case logLevel.ERROR:
            console.error('[Kafka Error]', message, ...logArgs);
            break;
          case logLevel.WARN:
            console.warn('[Kafka Warn]', message, ...logArgs);
            break;
          case logLevel.INFO:
            console.log('[Kafka Info]', message, ...logArgs);
            break;
          case logLevel.DEBUG:
            console.debug('[Kafka Debug]', message, ...logArgs);
            break;
        }
      };
    };

    const kafkaConfig: KafkaClientConfig = {
      clientId: this.config.clientId,
      brokers: this.config.brokers,
      logLevel: logLevel.WARN,
      logCreator: kafkaLogCreator,
      retry: {
        initialRetryTime: 300,
        retries: 8,
      },
    };

    this.kafka = new Kafka(kafkaConfig);
  }

  private getEnvVar(name: string, defaultValue: string): string {
    const value = process.env[name];
    if (!value || value.trim() === '') {
      return defaultValue;
    }
    return value.trim();
  }

  private parseBrokers(brokersEnv: string): string[] {
    return brokersEnv.split(',').map(b => b.trim()).filter(b => b.length > 0);
  }

  getTopic(): string {
    return this.config.topic;
  }

  getGroupId(): string {
    return this.config.groupId;
  }

  getBrokers(): string[] {
    return this.config.brokers;
  }

  getAcks(): number {
    return this.config.acks ?? 1;
  }

  getSendTimeout(): number {
    return this.config.sendTimeout ?? 30000;
  }

  async connect(): Promise<void> {
    try {
      this.producer = this.kafka.producer();
      await this.producer.connect();
      console.log('Kafka producer connected successfully');
    } catch (error) {
      console.error('Failed to connect Kafka producer:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.producer) {
        await this.producer.disconnect();
        console.log('Kafka producer disconnected');
      }
      if (this.consumer) {
        await this.consumer.disconnect();
        console.log('Kafka consumer disconnected');
      }
    } catch (error) {
      console.error('Error disconnecting Kafka:', error);
      throw error;
    }
  }

  getProducer(): Producer {
    if (!this.producer) {
      throw new Error('Kafka producer not initialized. Call connect() first.');
    }
    return this.producer;
  }

  async createConsumer(): Promise<Consumer> {
    if (this.consumer) {
      return this.consumer;
    }

    try {
      this.consumer = this.kafka.consumer({ groupId: this.config.groupId });
      await this.consumer.connect();
      console.log('Kafka consumer connected successfully');
      return this.consumer;
    } catch (error) {
      console.error('Failed to connect Kafka consumer:', error);
      throw error;
    }
  }

  async subscribeToTopic(topic: string, fromBeginning: boolean = false): Promise<void> {
    if (!this.consumer) {
      await this.createConsumer();
    }
    await this.consumer!.subscribe({ topic, fromBeginning });
    console.log(`Subscribed to Kafka topic: ${topic}`);
  }

  async sendMessage(topic: string, messages: Array<{ key?: string; value: string; headers?: Record<string, string> }>): Promise<void> {
    if (!this.producer) {
      throw new Error('Kafka producer not initialized. Call connect() first.');
    }

    try {
      await this.producer.send({
        topic,
        messages: messages.map(msg => ({
          key: msg.key,
          value: msg.value,
          headers: msg.headers,
        })),
      });
    } catch (error) {
      console.error('Failed to send message to Kafka:', error);
      throw error;
    }
  }

  async sendOrderEvent(orderId: string, status: string, date: Date): Promise<void> {
    const eventPayload = JSON.stringify({
      id: orderId,
      status,
      date: date.toISOString(),
    });

    await this.sendMessage(this.config.topic, [
      {
        key: orderId,
        value: eventPayload,
        headers: {
          'content-type': 'application/json',
          'event-type': 'order-status-update',
        },
      },
    ]);

    console.log(`Order event sent: orderId=${orderId}, status=${status}, topic=${this.config.topic}`);
  }

  isConnected(): boolean {
    return this.producer !== null;
  }
}

export const kafkaConfigService = new KafkaConfigService();

export { KafkaClientConfig as KafkaConfig };

// === ARCHIVO: api/src/common/exceptions/http-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface KafkaErrorPayload {
  topic?: string;
  partition?: number;
  offset?: string;
  timestamp?: string;
  [key: string]: unknown;
}

interface ExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
  method: string;
  details?: Record<string, unknown>;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let details: Record<string, unknown> | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        message = (resp.message as string) || message;
        error = (resp.error as string) || error;
        details = resp.details as Record<string, unknown> | undefined;
      }
    } else if (this.isKafkaError(exception)) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Kafka service unavailable';
      error = 'Kafka Error';
      details = this.extractKafkaErrorDetails(exception);
      this.logger.error(
        `Kafka error: ${message} - ${JSON.stringify(details)}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else if (exception instanceof Error) {
      message = exception.message || message;
      this.logger.error(
        `Unhandled error: ${message}`,
        exception.stack,
      );

      if (this.isValidationError(exception)) {
        status = HttpStatus.BAD_REQUEST;
        error = 'Validation Error';
        details = { validationErrors: exception.message };
      } else if (this.isTimeoutError(exception)) {
        status = HttpStatus.GATEWAY_TIMEOUT;
        error = 'Gateway Timeout';
      }
    }

    const responseBody: ExceptionResponse = {
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    if (details) {
      responseBody.details = details;
    }

    this.logger.log(
      `${request.method} ${request.url} -> ${status} [${error}]`,
    );

    response.status(status).json(responseBody);
  }

  private isKafkaError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    return (
      errorName.includes('kafka') ||
      errorMessage.includes('kafka') ||
      errorName.includes('broker') ||
      errorMessage.includes('broker') ||
      errorMessage.includes('producer') ||
      errorMessage.includes('consumer') ||
      errorName.includes('recordstobeproduced') ||
      errorName.includes('connection') ||
      errorMessage.includes('topic') ||
      errorMessage.includes('offset')
    );
  }

  private isValidationError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    return (
      errorName.includes('validation') ||
      errorMessage.includes('validation') ||
      errorName.includes('validator') ||
      errorMessage.includes('invalid') ||
      errorName.includes('badrequestexception')
    );
  }

  private isTimeoutError(error: unknown): boolean {
    if (!(error instanceof Error)) return false;
    const errorName = error.name.toLowerCase();
    const errorMessage = error.message.toLowerCase();
    return (
      errorName.includes('timeout') ||
      errorMessage.includes('timeout') ||
      errorName.includes('etimedout')
    );
  }

  private extractKafkaErrorDetails(error: unknown): KafkaErrorPayload {
    const details: KafkaErrorPayload = {};

    if (error instanceof Error) {
      if (error.message.includes('topic=')) {
        const topicMatch = error.message.match(/topic=([^\s,]+)/);
        if (topicMatch) details.topic = topicMatch[1];
      }
      if (error.message.includes('partition=')) {
        const partitionMatch = error.message.match(/partition=(\d+)/);
        if (partitionMatch) details.partition = parseInt(partitionMatch[1], 10);
      }
      if (error.message.includes('offset=')) {
        const offsetMatch = error.message.match(/offset=(\d+)/);
        if (offsetMatch) details.offset = offsetMatch[1];
      }
      if (error.message.includes('timestamp=')) {
        const timestampMatch = error.message.match(/timestamp=([^\s,]+)/);
        if (timestampMatch) details.timestamp = timestampMatch[1];
      }
    }

    return details;
  }
}

// === ARCHIVO: client/package.json ===
{
  "name": "order-tracking-client",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/cdk": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/material": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/router": "^20.0.0",
    "rxjs": "~7.8.1",
    "tslib": "^2.6.2",
    "zone.js": "~0.14.2",
    "@ngrx/store": "20.0.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "~20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@types/jest": "^29.5.12",
    "jest": "^29.7.0",
    "jest-preset-angular": "^14.0.3",
    "typescript": "~5.4.2"
  },
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": [
      "<rootDir>/setup-jest.ts"
    ],
    "globalSetup": "jest-preset-angular/global-setup"
  }
}


// === ARCHIVO: client/angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "order-tracking-client": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/order-tracking-client",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [],
            "scripts": []
          },
          "configurations": {
            "development": {
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": true
            },
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false
            }
          },
          "defaultConfiguration": "development"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "development": {
              "browserTarget": "order-tracking-client:build:development"
            },
            "production": {
              "browserTarget": "order-tracking-client:build:production"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "order-tracking-client:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:jest",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [],
            "scripts": []
          }
        }
      }
    }
  }
}


// === ARCHIVO: client/src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    importProvidersFrom(MatSnackBarModule),
    ...appConfig.providers
  ]
}).catch(err => console.error('Error bootstrapping the application:', err));

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Unhandled error:', event.error);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
  });
}

// === ARCHIVO: client/src/app/core/models/order-event.model.ts ===
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

// === ARCHIVO: client/tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ],
    "paths": {
      "@app/*": ["src/app/*"],
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"],
      "@services/*": ["src/app/services/*"],
      "@models/*": ["src/app/core/models/*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: client/src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Order Tracking - Sistema de Seguimiento de Órdenes</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Sistema de seguimiento de órdenes en tiempo real con Kafka">
  <meta name="author" content="Order Tracking Team">
  <meta name="theme-color" content="#1976d2">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      height: 100%;
      width: 100%;
      font-family: 'Roboto', sans-serif;
      background-color: #f5f5f5;
      color: #333;
    }
    .app-loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .app-loading-container .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    .app-loading-container .loading-text {
      margin-top: 20px;
      color: white;
      font-size: 16px;
      font-weight: 500;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .app-error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-color: #ffebee;
      color: #c62828;
      text-align: center;
      padding: 20px;
    }
    .app-error-container h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .app-error-container p {
      font-size: 14px;
      max-width: 400px;
    }
  </style>
</head>
<body>
  <app-root>
    <div class="app-loading-container">
      <div class="spinner"></div>
      <div class="loading-text">Cargando aplicación de seguimiento de órdenes...</div>
    </div>
  </app-root>
  <noscript>
    <div class="app-error-container">
      <h1>JavaScript Requerido</h1>
      <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: client/src/app/app.component.ts ===
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

// === ARCHIVO: client/src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { orderEventReducer } from './core/store/order-event.reducer';
import { OrderEventEffects } from './core/store/order-event.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),
    provideAnimationsAsync(),
    {
      provide: 'SSE_CONFIG',
      useValue: {
        reconnectInterval: 3000,
        maxRetries: 5,
        eventType: 'order-update'
      }
    },
    {
      provide: 'API_CONFIG',
      useValue: {
        baseUrl: 'http://localhost:3000',
        timeout: 30000,
        retryAttempts: 3
      }
    }
  ]
};

if (isDevMode()) {
  console.log('Modo desarrollo activo - habilitando herramientas de debugging');
}

// === ARCHIVO: client/src/app/app.routes.ts ===
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

// === ARCHIVO: client/src/app/features/order-tracking/order-tracking.component.ts ===
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

// === ARCHIVO: client/src/app/features/order-tracking/order-tracking.component.html ===
<div class="order-tracking-container">
  <header class="tracking-header">
    <h1 class="tracking-title">
      <mat-icon class="title-icon">local_shipping</mat-icon>
      Seguimiento de Órdenes
    </h1>
    <div class="connection-status" [class.connected]="isConnected()" [class.error]="connectionError()">
      <mat-icon>{{ isConnected() ? 'wifi' : 'wifi_off' }}</mat-icon>
      <span>{{ isConnected() ? 'Conectado' : connectionError() ? 'Error de conexión' : 'Conectando...' }}</span>
    </div>
  </header>

  <div class="stats-bar" *ngIf="orders().length > 0">
    <div class="stat-item">
      <span class="stat-value">{{ totalOrders() }}</span>
      <span class="stat-label">Total</span>
    </div>
    <div class="stat-item pending">
      <span class="stat-value">{{ pendingOrders() }}</span>
      <span class="stat-label">Pendientes</span>
    </div>
    <div class="stat-item processing">
      <span class="stat-value">{{ processingOrders() }}</span>
      <span class="stat-label">Procesando</span>
    </div>
    <div class="stat-item completed">
      <span class="stat-value">{{ completedOrders() }}</span>
      <span class="stat-label">Completadas</span>
    </div>
  </div>

  <div class="actions-bar" *ngIf="orders().length > 0">
    <button mat-stroked-button color="primary" (click)="reconnect()">
      <mat-icon>refresh</mat-icon>
      Reconectar
    </button>
    <button mat-stroked-button color="warn" (click)="clearOrders()">
      <mat-icon>delete_outline</mat-icon>
      Limpiar
    </button>
  </div>

  <div class="loading-state" *ngIf="isLoading()">
    <mat-spinner diameter="48"></mat-spinner>
    <p>Conectando al servidor de eventos...</p>
  </div>

  <div class="error-state" *ngIf="connectionError() && !isLoading()">
    <mat-icon class="error-icon">error_outline</mat-icon>
    <h3>Error de Conexión</h3>
    <p>{{ connectionError() }}</p>
    <button mat-raised-button color="primary" (click)="reconnect()">
      <mat-icon>refresh</mat-icon>
      Reintentar
    </button>
  </div>

  <div class="empty-state" *ngIf="!isLoading() && !connectionError() && orders().length === 0">
    <mat-icon class="empty-icon">inbox</mat-icon>
    <h3>Sin Órdenes</h3>
    <p>No hay órdenes disponibles. Las órdenes aparecerán aquí cuando se publiquen eventos.</p>
  </div>

  <div class="orders-grid" *ngIf="orders().length > 0">
    <app-order-status-card
      *ngFor="let order of orders(); trackBy: trackByOrderId"
      [orderId]="order.id"
      [status]="order.status"
      [date]="order.date"
      [lastUpdated]="order.lastUpdated"
      class="order-card-wrapper">
    </app-order-status-card>
  </div>
</div>

// === ARCHIVO: client/src/app/features/order-tracking/order-tracking.component.scss ===
.order-tracking-container {
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
}

.tracking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tracking-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  
  .title-icon {
    color: #4361ee;
    font-size: 32px;
    width: 32px;
    height: 32px;
  }
}

.connection-status {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  background: #f0f0f0;
  color: #666;
  transition: all 0.3s ease;

  mat-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
  }

  &.connected {
    background: #e8f5e9;
    color: #2e7d32;
  }

  &.error {
    background: #ffebee;
    color: #c62828;
  }
}

.stats-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.stat-item {
  flex: 1;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;

  .stat-value {
    display: block;
    font-size: 28px;
    font-weight: 700;
    color: #1a1a2e;
  }

  .stat-label {
    display: block;
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 4px;
  }

  &.pending .stat-value { color: #ff9800; }
  &.processing .stat-value { color: #2196f3; }
  &.completed .stat-value { color: #4caf50; }
}

.actions-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  text-align: center;

  p {
    color: #666;
    margin-top: 16px;
    max-width: 400px;
  }
}

.empty-icon,
.error-icon {
  font-size: 64px;
  width: 64px;
  height: 64px;
  color: #ccc;
}

.error-icon {
  color: #f44336;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.order-card-wrapper {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// === ARCHIVO: client/src/app/shared/components/order-status-card/order-status-card.component.ts ===
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

// === ARCHIVO: client/src/app/services/order-event.service.ts ===
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

// === ARCHIVO: client/src/app/features/order-tracking/order-tracking.component.spec.ts ===
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

// === ARCHIVO: client/setup-jest.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
import 'jest-preset-angular/setup-jest';


// === ARCHIVO: client/src/app/core/store/order-event.reducer.ts ===
import { createReducer, on } from '@ngrx/store';
import { OrderEvent } from '../models/order-event.model';

export interface OrderEventState {
  events: OrderEvent[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const initialState: OrderEventState = {
  events: [],
  loading: false,
  error: null,
  lastUpdated: null
};

export const orderEventReducer = createReducer(
  initialState,
  on(
    (state: OrderEventState, { event }: { event: OrderEvent }) => ({
      ...state,
      events: [...state.events, event],
      lastUpdated: new Date(event.date),
      error: null
    })
  ),
  on(
    (state: OrderEventState, { event }: { event: OrderEvent }) => {
      const existingIndex = state.events.findIndex(e => e.id === event.id);
      if (existingIndex >= 0) {
        const updatedEvents = [...state.events];
        updatedEvents[existingIndex] = event;
        return { ...state, events: updatedEvents, lastUpdated: new Date(event.date) };
      }
      return { ...state, events: [...state.events, event], lastUpdated: new Date(event.date) };
    }
  ),
  on(
    (state: OrderEventState) => ({
      ...state,
      events: [],
      loading: false,
      error: null,
      lastUpdated: null
    })
  ),
  on(
    (state: OrderEventState, { error }: { error: string }) => ({
      ...state,
      error,
      loading: false
    })
  ),
  on(
    (state: OrderEventState, { loading }: { loading: boolean }) => ({
      ...state,
      loading
    })
  )
);

export const selectAllEvents = (state: OrderEventState): OrderEvent[] => state.events;
export const selectLoading = (state: OrderEventState): boolean => state.loading;
export const selectError = (state: OrderEventState): string | null => state.error;
export const selectLastUpdated = (state: OrderEventState): Date | null => state.lastUpdated;

// === ARCHIVO: client/src/app/core/store/order-event.effects.ts ===
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

// === ARCHIVO: client/tsconfig.app.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.js",
    "src/**/*.jsx"
  ],
  "exclude": [
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx",
    "src/**/*.spec.js",
    "src/**/*.spec.jsx",
    "src/test.ts",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.test.js",
    "src/**/*.test.jsx",
    "src/setup-jest.ts",
    "src/environments/**/*.ts"
  ]
}

// === ARCHIVO: client/tsconfig.spec.json ===
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jest"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/setup-jest.ts",
    "src/**/*.d.ts"
  ],
  "exclude": []
}


// === ARCHIVO: client/src/setup-jest.ts ===
// Setup de tests generado automaticamente (referenciado por la config del runner).
// Agrega aca matchers globales o mocks compartidos.
export {};


// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  kafka:
    image: "apache/kafka:3.8.0"
    ports:
      - "127.0.0.1:9092:9092"
    environment:
      KAFKA_NODE_ID: "1"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_LISTENERS: "PLAINTEXT://:9092,CONTROLLER://:9093"
      KAFKA_ADVERTISED_LISTENERS: "PLAINTEXT://localhost:9092"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@localhost:9093"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: "1"
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: "1"
      KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS: "0"
    healthcheck:
      test: ["CMD-SHELL","/opt/kafka/bin/kafka-broker-api-versions.sh --bootstrap-server localhost:9092 > /dev/null 2>&1"]
      interval: 15s
      timeout: 10s
      retries: 10
      start_period: 30s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| Apache Kafka (KRaft, un nodo) | `apache/kafka:3.8.0` | 9092 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/kafka/create-topics.sh ===
#!/usr/bin/env bash
# Crea los topics en Kafka local (idempotente). Ejecutar con el compose levantado y healthy.
set -euo pipefail

docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --if-not-exists --topic app-events --partitions 1 --replication-factor 1

```
