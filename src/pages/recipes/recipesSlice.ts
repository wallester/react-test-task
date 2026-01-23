import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getRecipes, type Recipe } from '@/shared/api/recipesApi';
import type { RootState } from '@/app/store';

export type RecipesState = {
  items: Recipe[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;

  // Query state (intentionally basic)
  query: string;
  page: number;
  pageSize: number;

  // NOTE: Advanced interview challenges are intentionally NOT implemented:
  // - URL sync (Router query params)
  // - request cancellation / stale response protection
  // - server-side search / sorting
  // - normalized entities caching
};

const initialState: RecipesState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
  query: '',
  page: 1,
  pageSize: 10,
};

export const loadRecipes = createAsyncThunk(
  'recipes/load',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { page, pageSize } = state.recipes;
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    return await getRecipes({ limit, skip });
  }
);

const slice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.page = 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
      state.page = 1;
    },
  },
  extraReducers: (b) => {
    b.addCase(loadRecipes.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    b.addCase(loadRecipes.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload.recipes;
      state.total = action.payload.total;
    });
    b.addCase(loadRecipes.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? 'Request failed';
    });
  },
});

export const recipesReducer = slice.reducer;
export const recipesActions = slice.actions;

// Basic selector: apply client-side search (simple, no debounce required here).
export const selectVisibleRecipes = (state: RootState) => {
  const q = state.recipes.query.trim().toLowerCase();
  if (!q) return state.recipes.items;
  return state.recipes.items.filter((r) => r.name.toLowerCase().includes(q));
};
