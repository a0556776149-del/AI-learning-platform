import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../lib/prisma.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createPromptService = async (userId, categoryId, subCategoryId, prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  const [category, subCategory] = await Promise.all([
    prisma.category.findUnique({ where: { id: categoryId } }),
    prisma.subCategory.findUnique({ where: { id: subCategoryId } }),
  ]);

  const result = await model.generateContent(
    `You are a helpful learning assistant. The user is studying "${category?.name}" specifically "${subCategory?.name}". Provide a clear, structured lesson based on the user's prompt.\n\nUser prompt: ${prompt}`
  );

  const response = result.response.text();

  return await prisma.prompt.create({
    data: { userId, categoryId, subCategoryId, prompt, response },
  });
};

export const getPromptsByUserService = async (userId) => {
  return await prisma.prompt.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      subCategory: true,
    },
  });
};
