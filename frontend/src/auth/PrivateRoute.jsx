import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role !== "admin") {
      navigate('/');
    }
  }, [role, navigate]);

  return role === "admin" ? <Outlet /> : null;
};

export default PrivateRoute;
