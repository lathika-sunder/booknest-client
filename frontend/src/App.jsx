import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginComp from './components/LoginComp/LoginComp';
import LoginPage from './pages/Login/LoginPage'
import AdminHomePage from './pages/AdminHome/AdminHomePage';
import UserHomePage from './pages/UserHome/UserHomePage';
import PrivateRoute from './auth/PrivateRoute';
import NavbarComp from './components/NavbarComp/NavbarComp';
import AdminBooksPage from './pages/AdminBooksPage/AdminBooksPage';
import AdminDuesPage from './pages/AdminDuesPage/AdminDuesPage';

function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/']; // Add other paths here if needed, like '/signup'

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <NavbarComp />}
      <Routes>
        <Route exact path="/" element={<LoginPage/>} />
        <Route exact path="/home/user" element={<UserHomePage />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/home/admin" element={<AdminHomePage />} />
          <Route exact path="/home/books" element={<AdminBooksPage />} />
          <Route exact path="/home/books/dues" element={<AdminDuesPage />} />
        </Route>
      </Routes>
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
