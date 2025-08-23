import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Navbar from "./components/shared/Navbar";
import { Toaster } from "./components/ui/sonner";
import Orders from "./pages/Orders";
import Products from "./pages/Product";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetails/>} /> // single product info
        <Route path="/products/:category" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;