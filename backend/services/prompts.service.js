import OpenAI from "openai";
import { prisma } from "../lib/prisma.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const createPromptService = async (userId, categoryId, subCategoryId, prompt) => {
  const [category, subCategory] = await Promise.all([
    prisma.category.findUnique({ where: { id: categoryId } }),
    prisma.subCategory.findUnique({ where: { id: subCategoryId } }),
  ]);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful learning assistant. The user is studying "${category?.name}" specifically "${subCategory?.name}". Provide a clear, structured lesson based on the user's prompt.`,
      },
      { role: "user", content: prompt },
    ],
  });

  const response = completion.choices[0].message.content;

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
