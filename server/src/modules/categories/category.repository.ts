import { CategoryModel } from './category.model.js';

export const categoryRepository = {
  list() {
    return CategoryModel.find().sort({ name: 1 });
  }
};
