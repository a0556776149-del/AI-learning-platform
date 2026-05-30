export const validateCreateUser = (req, res, next) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "name and phone are required" });
  }
  next();
};

export const validateCreatePrompt = (req, res, next) => {
  const { userId, categoryId, subCategoryId, prompt } = req.body;
  if (!userId || !categoryId || !subCategoryId || !prompt) {
    return res.status(400).json({ error: "userId, categoryId, subCategoryId and prompt are required" });
  }
  next();
};
