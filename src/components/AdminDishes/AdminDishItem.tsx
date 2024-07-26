import React, { CSSProperties, PropsWithChildren } from 'react';
import { Dish } from '../../types';

interface Props extends PropsWithChildren {
  dish: Dish;
  addToCart?: VoidFunction;
  style?: CSSProperties;
}

const AdminDishItem: React.FC<Props> = ({
  dish,
  addToCart,
  style,
  children,
}) => {
  const imageStyle = {
    background: `url(${dish.image}) no-repeat center center / cover`,
    width: '300px',
    height: '120px',
  };

  return (
    <div className="card mb-3 w-75" style={style} onClick={addToCart}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="rounded-start" style={imageStyle} />
        <div className="px-4 d-flex gap-3 w-50 align-items-center justify-content-between">
          <h4 className="card-title m-0 ">{dish.title}</h4>
          <p className="card-text m-0 fs-5">{dish.price} KGS</p>
        </div>
        <div className="d-flex gap-3 justify-content-end pe-3">{children}</div>
      </div>
    </div>
  );
};

export default AdminDishItem;
