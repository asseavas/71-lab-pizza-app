import { NavLink } from 'react-router-dom';

const AdminDishes = () => {
  let dishes = <h3 className="text-center mt-5">There are no dishes!</h3>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center pt-2 pb-3 border-bottom border-2">
        <h2 className="m-0">Dishes</h2>
        <NavLink to="/admin/new-dish" className="btn btn-primary">
          Add new dish
        </NavLink>
      </div>
      <div>{dishes}</div>
    </>
  );
};

export default AdminDishes;
