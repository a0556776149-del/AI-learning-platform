import { Router } from "express";
import { getCategories, getSubCategories } from "../controllers/categories.controller.js";

const router = Router();

router.get("/", getCategories);
router.get("/:id/subcategories", getSubCategories);

export default router;
