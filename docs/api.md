# ViralAdda API

Base URL: `/api`

All protected endpoints require:

```http
Authorization: Bearer <accessToken>
```

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/register` | Create user account and return JWT pair. |
| POST | `/auth/login` | Login user or admin and return JWT pair. |
| POST | `/auth/refresh` | Exchange refresh token for new tokens. |
| POST | `/auth/forgot-password` | Neutral password reset request stub. |
| GET | `/auth/me` | Return authenticated user. |

## Videos

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/videos?page=1&limit=12&sort=trending&search=query&category=music` | Paginated feed. |
| GET | `/videos/:id` | Video detail, increments view count and watch history when authenticated. |
| POST | `/videos` | Multipart upload with `video`, optional `thumbnail`, and metadata fields. |
| PUT | `/videos/:id` | Update owner/admin video metadata. |
| DELETE | `/videos/:id` | Delete owner/admin video database record. |

Upload persistence stores only `telegramFileId`, `telegramThumbnailId`, and metadata in MongoDB.

## Comments

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/comments` | Add comment with `videoId` and `comment`. |
| GET | `/comments/:videoId` | Paginated video comments. |

## Likes

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/likes` | Like a video. |
| DELETE | `/likes` | Unlike a video. |

## Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/users/profile` | Current user profile. |
| PUT | `/users/profile` | Update profile. |
| GET | `/users/videos` | Uploaded videos. |
| GET | `/users/liked-videos` | Liked videos. |
| GET | `/users/watch-history` | Watch history. |

## Admin

Admin routes require an authenticated user with `role: admin`.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/admin/dashboard` | Totals for users, videos, views, comments. |
| GET | `/admin/users` | List users. |
| PATCH | `/admin/users/:id/block` | Block user. |
| PATCH | `/admin/users/:id/unblock` | Unblock user. |
| DELETE | `/admin/users/:id` | Delete user. |
| GET | `/admin/videos` | List videos for moderation. |
| PATCH | `/admin/videos/:id/approve` | Approve video. |
| PATCH | `/admin/videos/:id/reject` | Reject video. |
| DELETE | `/admin/videos/:id` | Delete video. |
| GET | `/admin/categories` | List categories. |
| POST | `/admin/categories` | Create category. |
| PUT | `/admin/categories/:id` | Update category. |
| DELETE | `/admin/categories/:id` | Delete category. |
| GET | `/admin/analytics` | Most viewed videos. |
