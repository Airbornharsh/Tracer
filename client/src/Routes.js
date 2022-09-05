import React from "react";
import { Route, Routes } from "react-router-dom";
import AddExpense from "./Pages/AddExpense";
import Category from "./Pages/Category";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/User/ChangePassword";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/login" element={<Login />} />
      <Route path="/user/changepassword" element={<ChangePassword />} />
      <Route path="/user/forgotpassword" element={<Login />} />
      <Route path="/category/:categoryid" element={<Category />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/addexpense" element={<AddExpense />} />
    </Routes>
  );
};

export default RoutesContainer;
