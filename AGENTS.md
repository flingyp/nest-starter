# AGENTS.md

## Quick Start

```bash
pnpm install
cp .env.example .env
npx prisma generate
pnpm start:dev
```

## Commands

| Command                  | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `pnpm start:dev`         | Development server with hot reload                     |
| `pnpm build`             | Production build                                       |
| `pnpm lint`              | Run ESLint check                                       |
| `pnpm lint:fix`          | Auto-fix lint issues                                   |
| `npx prisma generate`    | Generate Prisma client (required after schema changes) |
| `npx prisma migrate dev` | Run database migrations                                |
| `pnpm build:compodoc`    | Generate API documentation                             |

## Architecture Notes

- **Path alias**: `@/*` maps to `src/`. Use `import { X } from '@/modules/...'`
- **Prisma**: Schema in `prisma/schema.prisma`. Always run `npx prisma generate` after schema changes.
- **Global response**: All responses wrapped by `GlobalResponseInterceptor` with `{ data, code, message, success }` format
- **Global errors**: `GlobalHttpExceptionFilter` catches all exceptions

## Module Structure

Each feature follows this pattern:

```
src/modules/FeatureName/
├── index.controller.ts
├── index.service.ts
├── index.module.ts
└── index.dto.ts
```

Import modules via `src/modules/index.ts` barrel export.

## Environment

Required variables (see `.env.example`):

- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_HOST` / `REDIS_PORT` - Redis config
- `APP_PORT`, `APP_PREFIX`, `APP_VERSION`

## Testing

Jest configured in `package.json`. Run: `pnpm jest` or `npx jest`.

## Code Style

Uses `@antfu/eslint-config`. Run `pnpm lint:fix` before committing.
