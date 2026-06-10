# FacilityOS

Enterprise Facilities Management SaaS — Foundation Layer.

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, TailwindCSS, ShadCN UI
- **Backend:** NestJS, Prisma ORM
- **Database:** PostgreSQL, Redis
- **Infra:** Docker Compose

## Monorepo Structure

```
facilityos/
├── apps/
│   ├── web/          # Main application shell
│   └── admin/        # Admin shell
├── services/
│   ├── identity-service/
│   ├── tenant-service/
│   └── api-gateway/
├── packages/
│   ├── ui/           # Shared ShadCN components
│   ├── types/        # Shared TypeScript types
│   ├── utils/        # Logger, events, password utils
│   └── config/       # Shared configuration
├── prisma/           # Database schema & migrations
├── docker/           # Docker Compose & Dockerfiles
├── scripts/          # Setup scripts
└── docs/             # Documentation
```

## Quick Start (DEV-LITE)

No Docker, database, or backend services required. UI runs with mock authentication.

### Prerequisites

- Node.js 20+

### Run

```bash
npm install
npm run dev
```

Open **http://localhost:3000** and sign in:

| Field | Value |
|-------|-------|
| Email | `admin@demo.com` |
| Password | `123456` |

After login you are redirected to the dashboard shell. All data comes from `apps/web/src/lib/mock-api.ts`.

---

## Full Stack (optional)

Requires Docker, PostgreSQL, and backend services.

```bash
.\scripts\dev-setup.ps1   # Windows
./scripts/dev-setup.sh    # macOS/Linux
npm run dev:full
```

Or via Docker:

```bash
npm run docker:up
```

### Full Stack URLs

| Service | URL |
|---------|-----|
| API Gateway | http://localhost:3000 |
| Web App (with API) | http://localhost:3100 |
| Admin App | http://localhost:3200 |
| Identity Service | http://localhost:3001 |
| Tenant Service | http://localhost:3002 |

### Full Stack Demo Credentials

After database seeding:

- **Organization:** `demo-corp`
- **Email:** `admin@demo-corp.com`
- **Password:** `Admin123!`

## API Endpoints

### Identity Service (via Gateway)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register user |
| POST | `/auth/login` | No | Login |
| GET | `/auth/profile` | Yes | Get profile |

### Tenant Service (via Gateway)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/tenants` | No | Create tenant |
| GET | `/tenants` | Yes | List tenants |
| GET | `/tenants/:id` | Yes | Get tenant |
| POST | `/tenants/:id/users` | Yes | Assign user |

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed.

## What's NOT Included (Step 2+)

- CRM, Work Orders, AI, Digital Twin
- Kafka event streaming
- Kubernetes deployment
