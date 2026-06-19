import { UserModel } from '../users/user.model.js';

export const authRepository = {
  findByEmail(email: string) {
    return UserModel.findOne({ email });
  },

  findByEmailWithPassword(email: string) {
    return UserModel.findOne({ email }).select('+password');
  },

  findById(id: string) {
    return UserModel.findById(id);
  },

  createUser(input: { username: string; email: string; password: string }) {
    return UserModel.create(input);
  }
};
