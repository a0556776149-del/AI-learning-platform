import { Router } from "express";
import { getAllUsers, getUserPrompts } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id/prompts", getUserPrompts);

export default router;
