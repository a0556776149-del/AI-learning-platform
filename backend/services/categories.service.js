import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const getCategoriesService = async () => {
  return await prisma.category.findMany();
};

export const getSubCategoriesService = async (categoryId) => {
  return await prisma.subCategory.findMany({
    where: { categoryId },
  });
};
