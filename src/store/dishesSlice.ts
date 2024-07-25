import { ApiDish, Dish } from '../types';
import { createSlice } from '@reduxjs/toolkit';
import { createDish, fetchDishes } from './dishesThunks';

export interface DishesState {
  items: Dish[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: false | string;
  updateLoading: boolean;
  fetchOneLoading: boolean;
  oneDish: null | ApiDish;
}

const initialState: DishesState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  updateLoading: false,
  fetchOneLoading: false,
  oneDish: null,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchDishes.fulfilled, (state, { payload: items }) => {
        state.fetchLoading = false;
        state.items = items;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createDish.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    selectDishes: (state) => state.items,
    selectFetchDishesLoading: (state) => state.fetchLoading,
    selectCreateDishLoading: (state) => state.createLoading,
  },
});

export const dishesReducer = dishesSlice.reducer;

export const {
  selectDishes,
  selectFetchDishesLoading,
  selectCreateDishLoading,
} = dishesSlice.selectors;
