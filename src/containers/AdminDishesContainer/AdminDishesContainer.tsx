import { NavLink } from 'react-router-dom';
import AdminDishes from '../../components/AdminDishes/AdminDishes';

const AdminDishesContainer = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center pt-2 pb-3 mb-4">
        <h2 className="m-0">Dishes</h2>
        <NavLink to="/admin/new-dish" className="btn btn-primary">
          Add new dish
        </NavLink>
      </div>
      <div>
        <AdminDishes />
      </div>
    </>
  );
};

export default AdminDishesContainer;
