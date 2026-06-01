import jwt from "jsonwebtoken";
import { getAllUsersService, getUserPromptsService } from "../services/admin.service.js";

export const loginAdmin = (req, res) => {
  const { password } = req.body;

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.status(200).json({ token });
};

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.status(200).json(users);
};

export const getUserPrompts = async (req, res) => {
  const { id } = req.params;
  const prompts = await getUserPromptsService(Number(id));
  res.status(200).json(prompts);
};
