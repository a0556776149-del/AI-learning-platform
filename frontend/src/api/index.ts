import axios from "axios";
import type { AxiosResponse } from "axios";
import type { User, Category, SubCategory, Prompt } from "../types";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Users
export const createUser = (name: string, phone: string): Promise<User> =>
  api.post<User>("/users", { name, phone }).then((res: AxiosResponse<User>) => res.data);

export const getUserById = (id: number): Promise<User> =>
  api.get<User>(`/users/${id}`).then((res: AxiosResponse<User>) => res.data);

// Categories
export const getCategories = (): Promise<Category[]> =>
  api.get<Category[]>("/categories").then((res: AxiosResponse<Category[]>) => res.data);

export const getSubCategories = (categoryId: number): Promise<SubCategory[]> =>
  api.get<SubCategory[]>(`/categories/${categoryId}/subcategories`).then((res: AxiosResponse<SubCategory[]>) => res.data);

// Prompts
export const sendPrompt = (
  userId: number,
  categoryId: number,
  subCategoryId: number,
  prompt: string
): Promise<Prompt> =>
  api.post<Prompt>("/prompts", { userId, categoryId, subCategoryId, prompt }).then((res: AxiosResponse<Prompt>) => res.data);

export const getPromptHistory = (userId: number): Promise<Prompt[]> =>
  api.get<Prompt[]>(`/prompts/user/${userId}`).then((res: AxiosResponse<Prompt[]>) => res.data);

// Admin
export const adminLogin = (password: string): Promise<{ token: string }> =>
  api.post<{ token: string }>("/admin/login", { password }).then((res: AxiosResponse<{ token: string }>) => res.data);

export const getAllUsers = (token: string): Promise<User[]> =>
  api.get<User[]>("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res: AxiosResponse<User[]>) => res.data);

export const getUserPrompts = (userId: number, token: string): Promise<Prompt[]> =>
  api.get<Prompt[]>(`/admin/users/${userId}/prompts`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res: AxiosResponse<Prompt[]>) => res.data);
