import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Products from "./Pages/Product/Products";
import Product from "./Pages/Product/Product";
import ProductAdd from "./Pages/Product/AddProduct";
import ProductEdit from "./Pages/Product/EditProduct";
import Navbar from "./Components/Navbar";
import Users from "./Pages/Users";
import UserEdit from "./Pages/EditUser";

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <Router>
      <>
        {isLoggedIn ? <Navbar /> : <></>}
      </>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/product/:id/edit" element={<ProductEdit />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id/edit" element={<UserEdit />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
