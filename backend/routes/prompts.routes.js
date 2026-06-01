import { Router } from "express";
import { createPrompt, getPromptsByUser } from "../controllers/prompts.controller.js";
import { validateCreatePrompt } from "../middleware/validate.js";

const router = Router();

/**
 * @swagger
 * /prompts:
 *   post:
 *     summary: Send a prompt to AI and save response
 *     tags: [Prompts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userId, categoryId, subCategoryId, prompt]
 *             properties:
 *               userId:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               subCategoryId:
 *                 type: integer
 *               prompt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Prompt created and AI response returned
 *       400:
 *         description: Missing required fields
 */
router.post("/", validateCreatePrompt, createPrompt);

/**
 * @swagger
 * /prompts/user/{userId}:
 *   get:
 *     summary: Get all prompts by user ID
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user prompts
 */
router.get("/user/:userId", getPromptsByUser);

export default router;
