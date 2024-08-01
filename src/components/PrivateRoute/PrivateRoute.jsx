import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie'; 

const PrivateRoute = () => {
  const isLoggedIn = Cookies.get('isLoggedIn');

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
