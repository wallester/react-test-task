import { configureStore } from '@reduxjs/toolkit';
import { recipesReducer } from '@/pages/recipes/recipesSlice';
import { recipeDetailsReducer } from '@/pages/recipe-details/recipeDetailsSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    recipeDetails: recipeDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
