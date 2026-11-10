# Consumo y publicación de eventos en Kafka

El sistema de seguimiento de órdenes debe publicar y consumir eventos en un topic de Kafka para mostrar el estado de las órdenes en tiempo real. Los eventos deben ser reflejados inmediatamente en la interfaz de usuario. Los actores involucrados son el 'Productor de Eventos', que publica los eventos, y el 'Consumidor de Eventos', que los lee y actualiza la interfaz. El topic Kafka se llama 'ordenes-estado'. Los eventos contienen el ID de la orden, su estado y la fecha de la actualización.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Consumo de eventos en tiempo real con Kafka |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 4 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Configuración inicial del entorno Kafka

**Objetivo:** Configurar un entorno Kafka local para pruebas y desarrollo.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Configura un entorno Kafka local con un topic 'ordenes-estado'.
- Verifica que el topic esté correctamente creado y accesible.

**Entregable:** Entorno Kafka local con el topic 'ordenes-estado' configurado y accesible.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de la configuración correcta del broker Kafka para asegurar la disponibilidad y consistencia de los datos.
- Consideraciones sobre la retención de mensajes y particiones en Kafka.

</details>

### Fase 2: Publicación de eventos en Kafka

**Objetivo:** Implementar la funcionalidad para publicar eventos de actualización de órdenes en el topic Kafka.

**Tiempo estimado:** 1 hora

**Instrucciones:**

- Crea un servicio que publique eventos de actualización de órdenes en el topic 'ordenes-estado'.
- Asegúrate de que los eventos contengan el ID de la orden, su estado y la fecha de la actualización.

**Entregable:** Servicio que publica eventos de actualización de órdenes en el topic Kafka 'ordenes-estado'.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de incluir todos los datos relevantes en el evento para asegurar la integridad de la información.
- Manejo de errores al publicar eventos en Kafka.

</details>

### Fase 3: Consumo de eventos en Kafka

**Objetivo:** Implementar la funcionalidad para consumir eventos de Kafka y reflejarlos en la interfaz de usuario.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Crea un servicio que consuma eventos del topic 'ordenes-estado' y actualice la interfaz de usuario con el estado de las órdenes.
- Asegúrate de que los eventos se reflejen en tiempo real.

**Entregable:** Servicio que consume eventos del topic Kafka 'ordenes-estado' y actualiza la interfaz de usuario en tiempo real.

<details>
<summary>Pistas de conocimiento</summary>

- Importancia de la latencia en la actualización de la interfaz para asegurar una experiencia de usuario fluida.
- Manejo de errores al consumir eventos de Kafka.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es Kafka y por qué se utiliza para el consumo y publicación de eventos en tiempo real?
- **paraQueSirve**: ¿Para qué sirve el topic 'ordenes-estado' en el contexto del seguimiento de órdenes?
- **comoSeUsa**: ¿Cómo se usa Kafka para publicar y consumir eventos en tiempo real?
- **erroresComunes**: ¿Cuáles son los errores comunes al publicar y consumir eventos en Kafka y cómo se pueden manejar?

## Criterios de Evaluacion

- Configuración correcta del entorno Kafka local.
- Publicación de eventos en el topic 'ordenes-estado' con los datos requeridos.
- Consumo de eventos del topic 'ordenes-estado' y actualización en tiempo real de la interfaz de usuario.
- Manejo de errores al publicar y consumir eventos en Kafka.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install && npm run build) && (cd client && npm install && npm run build) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
