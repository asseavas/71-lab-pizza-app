import { Order } from '../types';
import { fetchOrders } from './ordersThunk';
import { createSlice } from '@reduxjs/toolkit';

export interface OrdersState {
  orders: Order[];
  loading: boolean;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const orderReducer = ordersSlice.reducer;
