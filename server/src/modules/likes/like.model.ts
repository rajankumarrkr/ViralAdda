import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const likeSchema = new Schema(
  {
    videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

likeSchema.index({ videoId: 1, userId: 1 }, { unique: true });

export type LikeDocument = InferSchemaType<typeof likeSchema> & { _id: mongoose.Types.ObjectId };
export const LikeModel = mongoose.model('Like', likeSchema);
