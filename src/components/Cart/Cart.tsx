import React from 'react';
import CartDishes from './CartDishes';
import { useAppSelector } from '../../app/hooks';
import { selectCartDishes } from '../../store/cartSlice';

interface Props {
  deleteCartDish: (id: string) => void;
}

const Cart: React.FC<Props> = ({ deleteCartDish }) => {
  const cartDishes = useAppSelector(selectCartDishes);

  let cart = (
    <div className="alert alert-primary">Cart is empty! Add something!</div>
  );

  if (cartDishes.length > 0) {
    cart = (
      <>
        <CartDishes cartDishes={cartDishes} deleteCartDish={deleteCartDish} />
      </>
    );
  }

  return <>{cart}</>;
};

export default Cart;
