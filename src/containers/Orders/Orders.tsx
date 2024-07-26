import Spinner from '../../components/Spinner/Spinner';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import {
  selectFetchOrdersLoading,
  selectOrders,
} from '../../store/ordersSlice';
import { deleteOrder, fetchOrders } from '../../store/ordersThunk';
import { useEffect } from 'react';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';
import { selectDeleteDishLoading } from '../../store/dishesSlice';
import { toast } from 'react-toastify';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useAppSelector(selectOrders);
  const loading = useAppSelector(selectFetchOrdersLoading);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);

  const removeOrder = async (orderId: string) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await dispatch(deleteOrder(orderId));
        await dispatch(fetchOrders());
        toast.success('Order deleted!');
      }
    } catch (e) {
      toast.error('Could not delete order!');
    }
  };

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  console.log(orders);

  return (
    <div className="row mt-2">
      <div className="col d-flex flex-column align-items-center">
        <h3 className="mb-2">Orders</h3>
        {loading ? (
          <Spinner />
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card mb-3 w-50">
              <div className="card-body">
                <strong>{order.customer.name}</strong>
                <span> ordered:</span>
                <ul className="list-group m-3">
                  {order.dishes.map((dish) => (
                    <li
                      key={dish.id}
                      className="list-group-item d-flex gap-3 align-items-center"
                    >
                      <span className="badge text-bg-primary rounded-pill">
                        {dish.amount}
                      </span>
                      <div className="row g-0 w-100">
                        <div className="col-6">{dish.title}</div>-
                        <div className="col text-end">
                          {dish.totalPrice} KGS
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <span>Delivery: 150 KGS</span>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h5 className="m-0">Total Price: {order.totalPrice} KGS</h5>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeOrder(order.id)}
                    disabled={
                      deleteLoading ? deleteLoading === order.id : false
                    }
                  >
                    {deleteLoading && deleteLoading === order.id && (
                      <ButtonSpinner />
                    )}
                    Complete order
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
