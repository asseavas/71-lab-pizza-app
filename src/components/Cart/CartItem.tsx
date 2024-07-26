import React from 'react';
import { CartDish } from '../../types';

interface Props {
  cartDish: CartDish;
  onDelete: VoidFunction;
}

const CartItem: React.FC<Props> = ({ cartDish, onDelete }) => {
  const price = cartDish.dish.price * cartDish.amount;

  return (
    <div className="card mb-2 p-2">
      <div className="row align-items-center">
        <div className="col">{cartDish.dish.title}</div>
        <div className="col-2">x{cartDish.amount}</div>
        <div className="col-3 text-end text-nowrap">{price} KGS</div>
        <button
          type="button"
          className="btn-close col-3 mx-3"
          onClick={onDelete}
        ></button>
      </div>
    </div>
  );
};

export default CartItem;
