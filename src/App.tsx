import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import AdminDishesContainer from './containers/AdminDishesContainer/AdminDishesContainer';
import NewDish from './containers/NewDish/NewDish';
import EditDish from './containers/EditDish/EditDish';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<h1>This is the client side page</h1>} />
        <Route path="/admin" element={<AdminDishesContainer />} />
        <Route path="/admin/dishes" element={<AdminDishesContainer />} />
        <Route path="/admin/orders" element={<h1>Admin panel orders</h1>} />
        <Route path="/admin/new-dish" element={<NewDish />} />
        <Route path="/admin/edit-dish/:id" element={<EditDish />} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
