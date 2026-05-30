import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.routes.js";
import categoriesRouter from "./routes/categories.routes.js";
import promptsRouter from "./routes/prompts.routes.js";
import adminRouter from "./routes/admin.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/prompts", promptsRouter);
app.use("/admin", adminRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});