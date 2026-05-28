import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createUserService = async (name, phone) => {
  return await prisma.user.create({
    data: { name, phone },
  });
};

export const getUserByIdService = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
