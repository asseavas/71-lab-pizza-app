import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiDish, ApiDishes, Dish } from '../types';
import { AppDispatch, RootState } from '../app/store';
import axiosApi from '../axiosApi';

export const fetchDishes = createAsyncThunk<
  Dish[],
  undefined,
  { dispatch: AppDispatch }
>('dishes/fetchDishes', async () => {
  const dishesResponse = await axiosApi.get<ApiDishes | null>(
    '/pizza-dishes.json',
  );
  const dishes = dishesResponse.data;

  let newDishes: Dish[] = [];

  if (dishes) {
    newDishes = Object.keys(dishes).map((key: string) => {
      const dish = dishes[key];
      return {
        id: key,
        ...dish,
      };
    });
  }

  return newDishes;
});

export const createDish = createAsyncThunk<void, ApiDish, { state: RootState }>(
  'dishes/create',
  async (apiDish) => {
    await axiosApi.post('/pizza-dishes.json', apiDish);
  },
);
