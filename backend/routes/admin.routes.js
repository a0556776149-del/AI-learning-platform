import { Router } from "express";
import { loginAdmin, getAllUsers, getUserPrompts } from "../controllers/admin.controller.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/users", authAdmin, getAllUsers);
router.get("/users/:id/prompts", authAdmin, getUserPrompts);

export default router;
