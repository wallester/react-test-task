import { http } from './http';

export type Recipe = {
  id: number;
  name: string;
  image: string;
};

export type RecipesListResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

export async function getRecipes(params: { limit: number; skip: number }) {
  const res = await http.get<RecipesListResponse>('/recipes', { params });
  return res.data;
}

export async function getRecipeById(id: number) {
  const res = await http.get(`/recipes/${id}`);
  return res.data as any;
}
