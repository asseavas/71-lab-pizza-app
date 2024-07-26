import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectDishes,
  selectFetchDishesLoading,
} from '../../store/dishesSlice';
import { fetchDishes } from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';
import AdminDishItem from '../AdminDishes/AdminDishItem';
import { addDish } from '../../store/cartSlice';
import { Dish } from '../../types';

const Dishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);
  const cardStyle = {
    cursor: 'pointer',
  };

  const addDishToCart = (dish: Dish) => {
    dispatch(addDish(dish));
  };

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div className="d-flex align-items-center flex-column">
      {dishesLoading ? (
        <Spinner />
      ) : (
        dishes.map((dish) => (
          <AdminDishItem
            key={dish.id}
            dish={dish}
            style={cardStyle}
            addToCart={() => addDishToCart(dish)}
          />
        ))
      )}
    </div>
  );
};

export default Dishes;
