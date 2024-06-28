import React from "react";
import { Routes, Route, Navigate, Outlet} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {

  const navigate=useNavigate()
   const role = localStorage.getItem('role');

  if (role === "admin") {
    return <Outlet />;
  } else {
    navigate('/')
  }
};

export default PrivateRoute;
