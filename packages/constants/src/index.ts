export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
} as const;

export const VIDEO_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
} as const;

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 12;
export const MAX_LIMIT = 50;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type VideoStatus = (typeof VIDEO_STATUS)[keyof typeof VIDEO_STATUS];
