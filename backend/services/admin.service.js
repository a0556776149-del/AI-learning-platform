import { prisma } from "../lib/prisma.js";

export const getAllUsersService = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getUserPromptsService = async (userId) => {
  return await prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      subCategory: true,
    },
  });
};
