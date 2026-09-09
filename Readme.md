# myEventScheduler

A distributed job scheduling and execution platform — built as a full-stack learning project covering backend architecture, queuing systems, real-time communication, and microservices.

**Live demo:** [my-event-scheduler.vercel.app](https://my-event-scheduler.vercel.app)
**API:** [myeventscheduler.onrender.com](https://myeventscheduler.onrender.com)

---

## What it does

Users create jobs (send an email, generate a report, call a webhook, trigger an external API) which are queued, executed asynchronously by independently scalable workers, and tracked through a strict state machine with automatic retries and dead-letter handling. Status changes are pushed to the frontend in real time over WebSockets — no polling.

## Architecture

```
                     ┌─────────────────┐
   Browser  ───────► │  scheduler-      │ ───► PostgreSQL
   (React)           │  service (API)   │      (jobs table, source of truth)
        ▲            └────────┬─────────┘
        │                     │ pushes {jobId}
        │                     ▼
        │            ┌─────────────────┐
        │            │  Redis (BullMQ   │
        │            │  queue + pub/sub)│
        │            └────────┬─────────┘
        │                     │
        │                     ▼
        │            ┌─────────────────┐
        │            │  worker-service  │ ──► HTTP calls back to
        │            │  (BullMQ worker) │     scheduler-service to
        │            └─────────────────┘     report status changes
        │
        │            ┌─────────────────┐
        └─────────────  notification-  │ ◄── subscribes to Redis
      WebSocket        service (ws)    │     pub/sub channel
                       └─────────────────┘
```

Each service is independently deployable, containerized, and communicates only through defined interfaces (HTTP or Redis) — no service reaches into another's database or internal code.

## Job state machine

The Postgres `status` column is the single source of truth for retry logic — BullMQ's own retry mechanism is deliberately disabled to avoid two systems disagreeing about attempt counts.

```
PENDING ──► RUNNING ──► COMPLETED
              │
              ▼
            FAILED ──► PENDING       (attempts < maxAttempts, auto-retry)
              │
              └──────► DEAD_LETTER   (attempts >= maxAttempts, exhausted)

DEAD_LETTER ──► PENDING              (manual retry, attempts reset to 0)
```

Every transition is validated against an explicit `canTransition()` check before it's applied — illegal transitions are rejected with a `409`, not silently allowed.

## Tech stack

| Layer | Technology |
|---|---|
| Language | TypeScript (strict mode) |
| API | Node.js, Express |
| Database | PostgreSQL + Sequelize (migrations, not `sync()`) |
| Queue | BullMQ + Redis |
| Real-time | Redis Pub/Sub + raw WebSockets (`ws`) |
| Validation | Zod |
| Frontend | React + Vite + Tailwind CSS |
| Containerization | Docker, Docker Compose (multi-stage builds, healthchecks) |
| Monorepo | npm workspaces (shared types package across services) |
| Deployment | Render (backend services), Vercel (frontend) |

## Services

- **`scheduler-service`** — REST API. Owns the Postgres schema and all business logic (the state machine). Every job transition, regardless of source, goes through here.
- **`worker-service`** — Consumes the BullMQ queue, dispatches jobs to type-specific handlers, and reports outcomes back to `scheduler-service` over HTTP (deliberately no direct DB access — preserves a single source of truth for schema and business rules).
- **`notification-service`** — Subscribes to a Redis Pub/Sub channel and broadcasts status changes to connected WebSocket clients.
- **`packages/shared`** — Shared TypeScript types (`JobStatus`, event payload shapes) used across all three services via npm workspaces.

## Key design decisions

- **Queue payloads carry only `{ jobId }`**, not the full job — the worker always fetches fresh data, avoiding staleness on delayed/long-scheduled jobs.
- **Domain events over direct coupling** — `JobService` emits internal events (`EventEmitter`) on every transition; a separate publisher module bridges those to Redis, keeping business logic free of infrastructure dependencies.
- **Fixed retry backoff (10s)** before a failed job is re-queued, preventing tight fail-retry loops.
- **Known gap, deliberately deferred:** if `scheduler-service` is unreachable at the exact moment a worker tries to report a job's outcome, that job can be left stuck in Postgres with no corresponding queue entry. A reconciliation/sweeper process to detect and re-queue orphaned jobs is planned as a resilience improvement.

## Running locally

```bash
docker-compose up --build
npx sequelize-cli db:migrate   # against the containerized Postgres
```

Scheduler API: `http://localhost:9001/scheduler-service/api/v1`
Notification WebSocket: `ws://localhost:9002`

## API overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/jobs` | Create a job |
| `GET` | `/jobs` | List jobs (filter by `status`, paginate with `limit`/`offset`) |
| `GET` | `/jobs/:id` | Get a single job |
| `POST` | `/jobs/:id/start` | Transition to `RUNNING` |
| `POST` | `/jobs/:id/complete` | Transition to `COMPLETED` |
| `POST` | `/jobs/:id/fail` | Transition to `FAILED`, then auto-routes to `PENDING` or `DEAD_LETTER` |
| `POST` | `/jobs/:id/retry` | Manually retry a `DEAD_LETTER` job |
| `DELETE` | `/jobs/:id` | Soft-delete a job |