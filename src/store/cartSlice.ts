import { CartDish, Dish } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  cartDishes: CartDish[];
}

const initialState: CartState = {
  cartDishes: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, { payload: dish }: PayloadAction<Dish>) => {
      const index = state.cartDishes.findIndex(
        (cartDish) => cartDish.dish.id === dish.id,
      );

      if (index !== -1) {
        state.cartDishes[index].amount++;
      } else {
        state.cartDishes.push({
          amount: 1,
          dish,
        });
      }
    },

    updateDishes: (state, { payload: dishes }: PayloadAction<Dish[]>) => {
      const newCartDishes: CartDish[] = [];
      state.cartDishes.forEach((cartDish: CartDish) => {
        const existingDish = dishes.find(
          (dish) => cartDish.dish.id === dish.id,
        );

        if (!existingDish) {
          return;
        }

        newCartDishes.push({
          ...cartDish,
          dish: existingDish,
        });
      });

      state.cartDishes = newCartDishes;
    },

    deleteCartDish: (state, { payload: dishId }: PayloadAction<string>) => {
      state.cartDishes = state.cartDishes.filter(
        (cartDish) => cartDish.dish.id !== dishId,
      );
    },

    clearCart: (state) => {
      state.cartDishes = [];
    },
  },

  selectors: {
    selectCartDishes: (state) => state.cartDishes,
  },
});

export const cartReducer = cartSlice.reducer;
export const { addDish, updateDishes, clearCart, deleteCartDish } =
  cartSlice.actions;
export const { selectCartDishes } = cartSlice.selectors;
