import axiosApi from '../axiosApi';
import { ApiDishes, ApiOrders, Order } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../app/store';

export const fetchOrders = createAsyncThunk<
  Order[],
  undefined,
  { dispatch: AppDispatch }
>('orders/fetchOrders', async () => {
  const { data: orders } = await axiosApi.get<ApiOrders | null>(
    '/pizza-orders.json',
  );
  const { data: dishes } = await axiosApi.get<ApiDishes | null>(
    '/pizza-dishes.json',
  );

  if (!orders || !dishes) {
    return [];
  }

  const newOrders: Order[] = Object.keys(orders).map((id) => {
    const order = orders[id];
    const orderDishes = Object.keys(order.order).map((dishId) => {
      const dish = dishes[dishId];
      const amount = order.order[dishId];
      return {
        ...dish,
        id: dishId,
        amount,
        totalPrice: dish.price * amount,
      };
    });

    const totalPrice =
      orderDishes.reduce((sum, dish) => sum + dish.totalPrice, 0) + 150;

    return {
      id,
      ...order,
      dishes: orderDishes,
      totalPrice,
    };
  });

  return newOrders;
});

export const deleteOrder = createAsyncThunk<void, string, { state: RootState }>(
  'orders/deleteOrder',
  async (orderId) => {
    await axiosApi.delete(`/pizza-orders/${orderId}.json`);
  },
);
