import { createUserService, getUserByIdService } from "../services/users.service.js";

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
