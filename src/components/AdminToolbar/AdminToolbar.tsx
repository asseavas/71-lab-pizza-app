import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminToolbar: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/admin" className="navbar-brand fs-3">
          Turtle Pizza Admin
        </NavLink>
        <ul className="navbar-nav d-flex flex-row gap-4 flex-nowrap">
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/dishes">
              Dishes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/orders">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminToolbar;
