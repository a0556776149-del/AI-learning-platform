import { createUserService, getUserByIdService, getUserByPhoneService } from "../services/users.service.js";

export const createUser = async (req, res) => {
  const { name, phone } = req.body;
  const user = await createUserService(name, phone);
  res.status(201).json(user);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdService(Number(id));
  res.status(200).json(user);
};

export const loginUser = async (req, res) => {
  const { phone } = req.body;
  const user = await getUserByPhoneService(phone);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.status(200).json(user);
};
