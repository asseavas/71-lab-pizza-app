import React from 'react';
import CartItem from './CartItem';
import { CartDish } from '../../types';

interface Props {
  cartDishes: CartDish[];
  deleteCartDish: (id: string) => void;
}

const CartDishes: React.FC<Props> = ({ cartDishes, deleteCartDish }) => {
  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 150);

  return (
    <>
      {cartDishes.map((cartDish) => (
        <CartItem
          key={cartDish.dish.id}
          cartDish={cartDish}
          onDelete={() => deleteCartDish(cartDish.dish.id)}
        />
      ))}
      <div className="card border-0 p-2">
        <div className="d-flex flex-column align-self-end w-50">
          <div className="row">
            <div className="col">Delivery:</div>
            <div className="col text-end">
              <strong>150</strong> KGS
            </div>
          </div>
          <div className="row">
            <div className="col">Total:</div>
            <div className="col text-end">
              <strong>{total}</strong> KGS
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDishes;
