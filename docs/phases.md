# Incremental Build Plan

## Phase 1: Foundation

- Monorepo workspaces.
- Shared types, constants, and utilities.
- Backend Express app, MongoDB connection, security middleware.

## Phase 2: Core Product

- Auth with JWT and bcrypt.
- Video upload through Telegram Bot API.
- Feed, video detail, comments, likes, watch history.

## Phase 3: Admin

- Admin login through existing auth endpoint.
- Dashboard metrics.
- User blocking and video approval/rejection.
- Category management and analytics.

## Phase 4: Production Hardening

- Tests.
- Refresh-token rotation.
- Upload validation by MIME type.
- Request logging and monitoring.
- CI/CD pipelines.
