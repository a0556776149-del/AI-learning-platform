import { getAllUsersService, getUserPromptsService } from "../services/admin.service.js";

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).json(users);
};

export const getUserPrompts = async (req, res) => {
  const { id } = req.params;
  const prompts = await getUserPromptsService(Number(id));
  res.status(200).json(prompts);
};
