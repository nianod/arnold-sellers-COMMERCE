import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Layout from "./Components/Layout/Layout";
import Signin from "./Pages/Auth/Signin";
import AdminAuth from "../AdminPanel/AdminAuth";
import AdminDashboard from "../AdminPanel/AdminDashboard";
import Products from "../AdminPanel/Pages/Products";
import Orders from "../AdminPanel/Pages/Orders";
import Categories from "../AdminPanel/Pages/Categories";
import Users from "../AdminPanel/Pages/Users";
import Messages from "../AdminPanel/Pages/Messages";
import MiniDashboard from "../AdminPanel/Pages/MiniDashboard";
import ManageAccount from "../AdminPanel/Pages/ManageAccount";
import Settings from "../AdminPanel/Pages/Settings";
import EntireCart from "./Components/EntireCart";
import ProtectedRoute from "./Pages/Auth/ProtectedRoute"
import Credentials from "./Pages/Auth/Credentials";
import Profile from "./Pages/Profile";
import Otp from "./Pages/Auth/Otp";
 
  
const App = () => {
 

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
 <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/entirecart" element={<EntireCart />} />
          </Route>
            
           
        </Route>

        <Route path="/credentials" element={<Credentials />} />          
        <Route path="/login" element={<Signin />} />
        <Route path="/otp" element={<Otp />} />

        <Route path="/admin" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}>
          <Route index element={<MiniDashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="minidashboard" element={<MiniDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="categories" element={<Categories />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="manage" element={<ManageAccount />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

