import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import AdminDishes from './containers/AdminDishes/AdminDishes';
import NewDish from './containers/NewDish/NewDish';
import './App.css';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/admin" element={<h1>Admin panel</h1>} />
        <Route path="/admin/dishes" element={<AdminDishes />} />
        <Route path="/admin/orders" element={<h1>Admin panel orders</h1>} />
        <Route path="/admin/new-dish" element={<NewDish/>} />
        <Route path="/" element={<h1>This is the client side page</h1>} />
        <Route path="*" element={<h1 className="text-center">Not found!</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
