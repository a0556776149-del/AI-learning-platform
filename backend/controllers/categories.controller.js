import { getCategoriesService, getSubCategoriesService } from "../services/categories.service.js";

export const getCategories = async (req, res) => {
  const categories = await getCategoriesService();
  res.status(200).json(categories);
};

export const getSubCategories = async (req, res) => {
  const { id } = req.params;
  const subCategories = await getSubCategoriesService(Number(id));
  res.status(200).json(subCategories);
};
