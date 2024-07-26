import {
  selectDeleteDishLoading,
  selectDishes,
  selectFetchDishesLoading,
} from '../../store/dishesSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AdminDishItem from './AdminDishItem';
import { useEffect } from 'react';
import { deleteDish, fetchDishes } from '../../store/dishesThunks';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';

const AdminDishes = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const deleteLoading = useAppSelector(selectDeleteDishLoading);
  const dishesLoading = useAppSelector(selectFetchDishesLoading);

  const removeDish = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete?')) {
        await dispatch(deleteDish(id));
        await dispatch(fetchDishes());
        toast.success('Dish deleted!');
      }
    } catch (e) {
      toast.error('Could not delete dish!');
    }
  };

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  return (
    <div>
      {dishesLoading ? (
        <Spinner />
      ) : (
        dishes.map((dish) => (
          <AdminDishItem
            key={dish.id}
            dish={dish}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
          />
        ))
      )}
    </div>
  );
};

export default AdminDishes;
