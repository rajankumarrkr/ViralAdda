# ViralAdda Architecture

## Monorepo

```text
client/
  mobile-app/
  admin-panel/
server/
packages/
  shared-types/
  shared-utils/
  constants/
docs/
```

## Server

The API uses feature-based modules. Each module owns its model, repository, service, controller, validator, and route file where applicable. Cross-cutting concerns live in `middlewares`, `config`, `helpers`, `routes`, and `utils`.

`server/src/routes` composes module routes into the REST API. Frontend clients never import server code and communicate only over HTTP.

Media storage is isolated under `server/src/services/storage`. Application code depends on `StorageProvider` from `storage.interface.ts` and obtains the implementation from `storage.factory.ts`.

Telegram-specific code exists only under `server/src/services/storage/telegram`:

- `telegram.provider.ts`
- `upload-video.ts`
- `upload-image.ts`
- `delete-media.ts`
- `get-file-url.ts`

MongoDB stores only Telegram file IDs and metadata. The backend resolves short-lived Telegram file URLs when returning playable video payloads.

## Mobile App

React Native uses:

- React Navigation for stack and tab navigation.
- Redux Toolkit for auth state.
- RTK Query for API calls and cache invalidation.
- Async Storage for token persistence.
- React Native Video for playback.

The app is organized by reusable components, screens, navigation, Redux state, hooks, API services, utilities, constants, and assets. It is decoupled from the server implementation and uses REST APIs only.

## Admin Panel

The admin panel uses Vite, React, Material UI, Redux Toolkit, and RTK Query. `layouts` owns shell UI, `routes` owns route constants, `pages` owns screen-level views, and `services` owns REST API access.

## Path Aliases

- Root: `@server/*`, `@mobile/*`, `@admin/*`, and shared package aliases.
- Server: `@server/*`.
- Mobile: `@mobile/*`.
- Admin: `@admin/*`.

## Growth Path

Recommended next phases:

1. Add refresh-token rotation and server-side token revocation.
2. Add background jobs for notifications and analytics aggregation.
3. Add CDN/proxy caching in front of Telegram media URLs if traffic grows.
4. Add automated tests for auth, upload, moderation, and feed pagination.
5. Add observability with structured logs and metrics.
