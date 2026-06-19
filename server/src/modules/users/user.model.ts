import { USER_ROLES, type UserRole } from '@viraladda/constants';
import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, minlength: 3, maxlength: 32 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    profileImage: { type: String },
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER satisfies UserRole },
    isBlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userSchema.index({ username: 'text', email: 'text' });

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };
export const UserModel = mongoose.model('User', userSchema);
