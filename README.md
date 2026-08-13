# Sistema de Gestión de Tickets (Prueba Técnica)

## Stack Tecnológico
* **Backend:** Python (Flask) + SQLAlchemy (ORM)
* **Base de Datos:** PostgreSQL + Docker Compose
* **Frontend:** React (En proceso)

## Arquitectura y Reglas de Negocio
1. **Máquina de Estados Estricta:**
   * `NUEVO` ➜ `ABIERTO`
   * `ABIERTO` ➜ `EN_PROGRESO`
   * `EN_PROGRESO` ➜ `RESUELTO`
   * `RESUELTO` ➜ `CERRADO` o `EN_PROGRESO`
   * `CERRADO` (Estado final)
2. **Registro de Auditoría (Historial):**
   * Cada cambio de estado genera un registro automático en la tabla `ticket_historial`.

## API Endpoints Disponibles
* `GET /tickets` - Obtiene la lista completa de tickets.
* `POST /tickets` - Crea un nuevo ticket (Estado inicial: NUEVO).
* `PATCH /tickets/<id>/estado` - Cambia el estado de un ticket validando la regla de transición.