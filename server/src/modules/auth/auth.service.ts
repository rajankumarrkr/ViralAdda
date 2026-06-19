import bcrypt from 'bcryptjs';
import { AppError } from '../../utils/AppError.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../../utils/jwt.js';
import { authRepository } from './auth.repository.js';

const sanitizeUser = (user: any) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  profileImage: user.profileImage,
  role: user.role,
  isBlocked: user.isBlocked,
  createdAt: user.createdAt
});

const issueTokens = (user: any) => ({
  accessToken: signAccessToken({ sub: user.id, role: user.role }),
  refreshToken: signRefreshToken({ sub: user.id, role: user.role })
});

export const authService = {
  async register(input: { username: string; email: string; password: string }) {
    const existing = await authRepository.findByEmail(input.email);
    if (existing) throw new AppError('Email is already registered', 409);

    const password = await bcrypt.hash(input.password, 12);
    const user = await authRepository.createUser({ ...input, password });
    return { user: sanitizeUser(user), ...issueTokens(user) };
  },

  async login(input: { email: string; password: string }) {
    const user = await authRepository.findByEmailWithPassword(input.email);
    if (!user) throw new AppError('Invalid credentials', 401);
    if (user.isBlocked) throw new AppError('Account is blocked', 403);

    const matches = await bcrypt.compare(input.password, user.password);
    if (!matches) throw new AppError('Invalid credentials', 401);

    return { user: sanitizeUser(user), ...issueTokens(user) };
  },

  async refresh(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const user = await authRepository.findById(payload.sub);
    if (!user || user.isBlocked) throw new AppError('User is not authorized', 401);
    return issueTokens(user);
  },

  async me(userId: string) {
    const user = await authRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return sanitizeUser(user);
  },

  async forgotPassword(email: string) {
    const user = await authRepository.findByEmail(email);
    // Keep the response neutral so account existence cannot be enumerated.
    if (!user) return { success: true };
    return { success: true };
  }
};
