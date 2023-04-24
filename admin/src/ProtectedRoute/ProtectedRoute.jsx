/** @format */

import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, ...rest }) => {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to='/home' />;
  }
};

export default ProtectedRoute;
