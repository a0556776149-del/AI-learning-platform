import { Router } from "express";
import { createUser, getUserById } from "../controllers/users.controller.js";
import { validateCreateUser } from "../middleware/validate.js";

const router = Router();

router.post("/", validateCreateUser, createUser);

router.get("/:id", getUserById);

export default router;
