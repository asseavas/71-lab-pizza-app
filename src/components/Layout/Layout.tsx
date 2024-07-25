import React from 'react';
import AdminToolbar from '../AdminToolbar/AdminToolbar';
import { useLocation } from 'react-router-dom';
import ClientToolbar from '../ClientToolbar/ClientToolbar';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  let toolbar = <ClientToolbar />;

  if (
    location.pathname === '/admin' ||
    location.pathname === '/admin/dishes' ||
    location.pathname === '/admin/orders'
  ) {
    toolbar = <AdminToolbar />;
  }

  return (
    <>
      <header>{toolbar}</header>
      <main className="container pt-3">{children}</main>
    </>
  );
};

export default Layout;
