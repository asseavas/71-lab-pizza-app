export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

export type ApiDish = Omit<Dish, 'id'>;

export interface ApiDishes {
  [id: string]: ApiDish;
}

export interface DishMutation {
  title: string;
  price: string;
  image: string;
}

export type CartDish = {
  dish: Dish;
  amount: number;
};

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface OrderInfo {
  [id: string]: number;
}

export interface ApiOrder {
  order: OrderInfo;
  customer: Customer;
}

export interface ApiOrders {
  [id: string]: ApiOrder;
}

export interface Order extends ApiOrder {
  id: string;
  totalPrice: number;
}
