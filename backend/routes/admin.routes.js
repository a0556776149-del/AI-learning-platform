import { Router } from "express";
import { loginAdmin, getAllUsers, getUserPrompts } from "../controllers/admin.controller.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = Router();

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login - returns JWT token
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 *       401:
 *         description: Invalid password
 */
router.post("/login", loginAdmin);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 */
router.get("/users", authAdmin, getAllUsers);

/**
 * @swagger
 * /admin/users/{id}/prompts:
 *   get:
 *     summary: Get all prompts of a specific user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of user prompts
 *       401:
 *         description: Unauthorized
 */
router.get("/users/:id/prompts", authAdmin, getUserPrompts);

export default router;
