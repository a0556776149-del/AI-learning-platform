import { prisma } from "../lib/prisma.js";

export const getCategoriesService = async () => {
  return await prisma.category.findMany();
};

export const getSubCategoriesService = async (categoryId) => {
  return await prisma.subCategory.findMany({
    where: { categoryId },
  });
};
