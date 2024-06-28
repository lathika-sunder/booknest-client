import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginComp from './components/LoginComp/LoginComp'
import AdminHomePage from './pages/AdminHome/AdminHomePage'
import UserHomePage from './pages/UserHome/UserHomePage'
import PrivateRoute from './auth/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LoginComp />}></Route>

        <Route exact path='/home/user' element={<UserHomePage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route exact path='/home/admin' element={<AdminHomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
