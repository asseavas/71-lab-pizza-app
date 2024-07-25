import { NavLink } from 'react-router-dom';

const ClientToolbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <NavLink to="/" className="navbar-brand fs-3">
          Turtle Pizza
        </NavLink>
      </div>
    </nav>
  );
};

export default ClientToolbar;
