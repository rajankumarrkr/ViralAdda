import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const commentSchema = new Schema(
  {
    videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    comment: { type: String, required: true, trim: true, maxlength: 500 }
  },
  { timestamps: true }
);

export type CommentDocument = InferSchemaType<typeof commentSchema> & { _id: mongoose.Types.ObjectId };
export const CommentModel = mongoose.model('Comment', commentSchema);
