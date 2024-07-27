import { useEffect } from 'react';
import DishForm from '../../components/DishForm/DishForm';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectOneDish,
  selectOneDishLoading,
  selectUpdateDishLoading,
} from '../../store/dishesSlice';
import { ApiDish } from '../../types';
import { fetchOneDish, updateDish } from '../../store/dishesThunks';
import { toast } from 'react-toastify';

const EditDish = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectOneDishLoading);
  const isUpdating = useAppSelector(selectUpdateDishLoading);
  const dish = useAppSelector(selectOneDish);

  const onSubmit = async (apiDish: ApiDish) => {
    try {
      await dispatch(updateDish({ id, apiDish })).unwrap();
      navigate(`/admin`);
      toast.success('Dish updated!');
    } catch (error) {
      toast.error('Could not update dish!');
    }
  };

  useEffect(() => {
    dispatch(fetchOneDish(id));
  }, [dispatch, id]);

  return (
    <div className="row mt-2">
      <div className="col d-flex align-items-center flex-column">
        {isFetching && <Spinner />}
        {dish && (
          <DishForm
            onSubmit={onSubmit}
            existingDish={dish}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
};

export default EditDish;
