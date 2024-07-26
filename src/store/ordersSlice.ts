import { Order } from '../types';
import { deleteOrder, fetchOrders } from './ordersThunk';
import { createSlice } from '@reduxjs/toolkit';

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  deleteLoading: false | string;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  deleteLoading: false,
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

    builder
      .addCase(deleteOrder.pending, (state, { meta: { arg: orderId } }) => {
        state.deleteLoading = orderId;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.deleteLoading = false;
      });
  },

  selectors: {
    selectOrders: (state) => state.orders,
    selectFetchOrdersLoading: (state) => state.loading,
    selectDeleteOrderLoading: (state) => state.deleteLoading,
  },
});

export const orderReducer = ordersSlice.reducer;

export const {
  selectOrders,
  selectFetchOrdersLoading,
  selectDeleteOrderLoading,
} = ordersSlice.selectors;
