import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../lib/prisma.js";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const createPromptService = async (userId, categoryId, subCategoryId, prompt) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(
    `You are a helpful learning assistant. Provide clear, structured lessons based on the user's prompt.\n\n${prompt}`
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
