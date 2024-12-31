import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignupForm from './Signup';
import LoginPage from './LoginPage';
import Admin from './Admin';
import ChangePassword from './ChangePassword';
import DriverList from './DriverList';
import Complaints from './Complaints';
import OrderHistory from './OrderHistory';
import 'boxicons/css/boxicons.min.css';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/order_history" element={<OrderHistory/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
