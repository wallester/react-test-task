import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRecipeById } from '@/shared/api/recipesApi';

export type RecipeDetailsState = {
  item: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;

  // NOTE: caching by ID / normalized entities intentionally NOT implemented (interview challenge).
};

const initialState: RecipeDetailsState = {
  item: null,
  status: 'idle',
  error: null,
};

export const loadRecipeDetails = createAsyncThunk('recipeDetails/load', async (id: number) => {
  return await getRecipeById(id);
});

const slice = createSlice({
  name: 'recipeDetails',
  initialState,
  reducers: {
    clear(state) {
      state.item = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(loadRecipeDetails.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    b.addCase(loadRecipeDetails.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.item = action.payload;
    });
    b.addCase(loadRecipeDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Request failed';
    });
  },
});

export const recipeDetailsReducer = slice.reducer;
export const recipeDetailsActions = slice.actions;
