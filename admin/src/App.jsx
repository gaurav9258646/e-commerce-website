import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout wrapper
import Layout from "./components/Layout";

// Pages
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home route without any page content */}
     <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/users" element={<Users />} />
        <Route  path="/product/:slug" element={<Product/>} />
        
        

        {/* Login page without layout */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
