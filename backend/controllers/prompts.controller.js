import { createPromptService, getPromptsByUserService } from "../services/prompts.service.js";

export const createPrompt = async (req, res) => {
  const { userId, categoryId, subCategoryId, prompt } = req.body;
  const result = await createPromptService(userId, categoryId, subCategoryId, prompt);
  res.status(201).json(result);
};

export const getPromptsByUser = async (req, res) => {
  const { userId } = req.params;
  const prompts = await getPromptsByUserService(Number(userId));
  res.status(200).json(prompts);
};
