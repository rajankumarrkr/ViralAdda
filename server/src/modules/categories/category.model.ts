import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true }
  },
  { timestamps: true }
);

export type CategoryDocument = InferSchemaType<typeof categorySchema> & { _id: mongoose.Types.ObjectId };
export const CategoryModel = mongoose.model('Category', categorySchema);
