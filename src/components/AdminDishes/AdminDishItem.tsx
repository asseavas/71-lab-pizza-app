import React from 'react';
import { Dish } from '../../types';
import { Link } from 'react-router-dom';
import ButtonSpinner from '../Spinner/ButtonSpinner';

interface Props {
  dish: Dish;
  onDelete: VoidFunction;
  deleteLoading: false | string;
}

const AdminDishItem: React.FC<Props> = ({ dish, onDelete, deleteLoading }) => {
  const imageStyle = {
    background: `url(${dish.image}) no-repeat center center / cover`,
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-sm-3 rounded-start" style={imageStyle} />
        <div
          className="col-sm-9 px-4 d-flex align-items-center justify-content-between"
          style={{ height: 100 }}
        >
          <h4 className="card-title m-0 col-6">{dish.title}</h4>
          <p className="card-text m-0 fs-5 col-3">{dish.price} KGS</p>
          <div className="d-flex gap-3 col-3 justify-content-end">
            <button
              className="btn btn-danger"
              onClick={onDelete}
              disabled={deleteLoading ? deleteLoading === dish.id : false}
            >
              {deleteLoading && deleteLoading === dish.id && <ButtonSpinner />}
              Delete
            </button>
            <Link
              className="btn btn-primary"
              to={`/admin/edit-dish/${dish.id}`}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDishItem;
