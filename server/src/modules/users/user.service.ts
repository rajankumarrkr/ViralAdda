import { AppError } from '../../utils/AppError.js';
import { userRepository } from './user.repository.js';

const publicUser = (user: any) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  profileImage: user.profileImage,
  role: user.role,
  isBlocked: user.isBlocked,
  createdAt: user.createdAt
});

export const userService = {
  async profile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return publicUser(user);
  },

  async updateProfile(userId: string, input: any) {
    const user = await userRepository.updateById(userId, input);
    if (!user) throw new AppError('User not found', 404);
    return publicUser(user);
  },

  uploadedVideos(userId: string) {
    return userRepository.uploadedVideos(userId);
  },

  async likedVideos(userId: string) {
    const likes = await userRepository.likesByUser(userId);
    return userRepository.videosByIds(likes.map((like) => like.videoId));
  },

  async watchHistory(userId: string) {
    return userRepository.watchHistory(userId);
  }
};
