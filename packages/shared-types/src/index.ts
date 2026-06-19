import type { UserRole, VideoStatus } from '@viraladda/constants';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  profileImage?: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: string;
}

export interface VideoDto {
  id: string;
  title: string;
  description?: string;
  category?: string;
  telegramFileId: string;
  telegramThumbnailId?: string;
  playbackUrl?: string;
  thumbnailUrl?: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  uploadedBy: Pick<UserDto, 'id' | 'username' | 'profileImage'>;
  status: VideoStatus;
  createdAt: string;
}

export interface CommentDto {
  id: string;
  videoId: string;
  user: Pick<UserDto, 'id' | 'username' | 'profileImage'>;
  comment: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AuthResponse {
  user: UserDto;
  accessToken: string;
  refreshToken: string;
}
