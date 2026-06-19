# ViralAdda

ViralAdda is a production-oriented monorepo for a YouTube-style mobile video sharing platform with a separate admin panel and Node.js API.

## Monorepo Layout

- `client/mobile-app` - React Native app with React Navigation, Redux Toolkit, RTK Query, and React Native Video.
- `client/admin-panel` - Vite React admin panel with Material UI and Redux Toolkit.
- `server` - Express, MongoDB, JWT auth, module-based API, and Telegram-backed storage provider.

## Packages

- `packages/shared-types` - Shared API and domain types.
- `packages/shared-utils` - Small cross-app utilities.
- `packages/constants` - Shared roles, statuses, and pagination constants.

## Quick Start

1. Copy environment files:
   ```bash
   cp server/.env.example server/.env
   cp client/admin-panel/.env.example client/admin-panel/.env
   cp client/mobile-app/.env.example client/mobile-app/.env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start server:
   ```bash
   npm run dev:server
   ```
4. Start admin:
   ```bash
   npm run dev:admin
   ```
5. Start mobile:
   ```bash
   npm run dev:mobile
   ```

See [docs/deployment.md](docs/deployment.md) and [docs/api.md](docs/api.md).
