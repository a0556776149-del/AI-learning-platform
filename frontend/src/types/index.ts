export type User = {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
};

export type Category = {
  id: number;
  name: string;
};

export type SubCategory = {
  id: number;
  name: string;
  categoryId: number;
};

export type Prompt = {
  id: number;
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
  response: string;
  createdAt: string;
  category: Category;
  subCategory: SubCategory;
};
