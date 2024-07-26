import Dishes from '../../components/Dishes/Dishes';
import Modal from '../../components/Modal/Modal';
import React, { useCallback, useEffect, useState } from 'react';
import Cart from '../../components/Cart/Cart';
import { useSelector } from 'react-redux';
import {
  clearCart,
  deleteCartDish,
  selectCartDishes,
} from '../../store/cartSlice';
import { useAppDispatch } from '../../app/hooks';
import { ApiOrder, Customer, OrderInfo } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const DishesContainer = () => {
  const dispatch = useAppDispatch();
  const cartDishes = useSelector(selectCartDishes);
  const [showModal, setShowModal] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartDishes.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);

  const deleteDish = (dishId: string) => {
    dispatch(deleteCartDish(dishId));
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkFormValidity = useCallback(() => {
    const { name, address, phone } = customer;
    if (name && address && phone) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [customer]);

  useEffect(() => {
    checkFormValidity();
  }, [customer, checkFormValidity]);

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const order = cartDishes.reduce<OrderInfo>((acc, cartDish) => {
      acc[cartDish.dish.id] = cartDish.amount;
      return acc;
    }, {});

    const newOrder: ApiOrder = {
      order,
      customer,
    };

    try {
      await axiosApi.post('/pizza-orders.json', newOrder);
    } finally {
      setIsLoading(false);
      dispatch(clearCart());
      setCustomer({
        name: '',
        address: '',
        phone: '',
      });
      setShowModal(false);
    }
  };

  let form = (
    <form className="mt-4 d-flex flex-column gap-3 p-3" onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Client name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          className="form-control"
          value={customer.name}
          onChange={onFieldChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          name="address"
          required
          className="form-control"
          value={customer.address}
          onChange={onFieldChange}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="text"
          name="phone"
          required
          className="form-control"
          value={customer.phone}
          onChange={onFieldChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
        Order
      </button>
    </form>
  );

  if (isLoading) {
    form = <Spinner />;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pt-2 mb-4">
        <h2 className="m-0">Dishes</h2>
        <div className="d-flex justify-content-center align-items-center gap-4">
          <p className="m-0 fs-5 bg-body-secondary px-3 py-2 rounded-3">
            Order total: <strong>{total}</strong>
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Checkout
          </button>
        </div>
      </div>
      <div>
        <Dishes />
      </div>
      <Modal
        show={showModal}
        title="Your order"
        onClose={() => setShowModal(false)}
      >
        <div className="modal-body">
          <Cart deleteCartDish={deleteDish} />
        </div>
        {form}
        <div className="modal-footer">
          <button
            className="btn btn-danger"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          {/*<button*/}
          {/*  className="btn btn-success"*/}
          {/*  // onClick={() => navigate('checkout')}*/}
          {/*>*/}
          {/*  Order*/}
          {/*</button>*/}
        </div>
      </Modal>
    </>
  );
};

export default DishesContainer;
