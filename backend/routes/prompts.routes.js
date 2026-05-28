import { Router } from "express";
import { createPrompt, getPromptsByUser } from "../controllers/prompts.controller.js";

const router = Router();

router.post("/", createPrompt);
router.get("/user/:userId", getPromptsByUser);

export default router;
