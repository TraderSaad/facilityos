# FacilityOS

Enterprise Facilities Management SaaS — Phase 1B scaffold.

## Workspace Layout

- `apps/web` — Public Next.js storefront and authentication flow
- `apps/admin` — Admin portal shell
- `services/identity-service` — NestJS authentication service
- `services/tenant-service` — NestJS tenant management service
- `services/api-gateway` — NestJS API gateway with JWT validation
- `packages/ui` — Shared React UI components
- `packages/types` — Shared TypeScript types
- `packages/utils` — Shared utility helpers
- `packages/config` — Shared configuration helpers
- `prisma` — Prisma schema and migrations
- `docker` — Docker Compose starter
- `scripts` — local helper scripts
- `docs` — documentation

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Generate the Prisma client:

```bash
npm run prisma:generate
```

3. Start local database infrastructure:

```bash
npm run docker:up
```

This repository currently focuses on the Prisma database foundation, including PostgreSQL and Redis infrastructure.

## Backend APIs

- `POST /auth/register` — register a new user
- `POST /auth/login` — login and receive a JWT
- `GET /auth/profile` — retrieve the authenticated user profile
- `POST /tenants` — create a new tenant
- `GET /tenants` — list tenants
- `GET /tenants/:id` — retrieve tenant details

## Environment

Copy `.env.example` to `.env` and update values as needed.
