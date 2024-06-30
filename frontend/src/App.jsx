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
import  {QueryClient, QueryClientProvider, useQuery} from 'react-query'

const queryClient=new QueryClient
function App() {
  const location = useLocation();
  const hideNavbarPaths = ['/']; 


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
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </QueryClientProvider>
);

export default AppWrapper;
