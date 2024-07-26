import { configureStore } from '@reduxjs/toolkit';
import { dishesReducer } from '../store/dishesSlice';
import { cartReducer } from '../store/cartSlice';
import { orderReducer } from '../store/ordersSlice';

export const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
