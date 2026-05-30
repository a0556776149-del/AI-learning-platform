import { Router } from "express";
import { createPrompt, getPromptsByUser } from "../controllers/prompts.controller.js";
import { validateCreatePrompt } from "../middleware/validate.js";

const router = Router();

router.post("/", validateCreatePrompt, createPrompt);
router.get("/user/:userId", getPromptsByUser);

export default router;
