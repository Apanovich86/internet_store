import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import {Layout} from "./Layout";
import Register from "./Register/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./Profile/Profile";
import BoardAdmin from "./pages/BoardAdmin";
import BoardUser from "./pages/BoardUser";

function App() {

  return (
      <>
        <Routes>
          <Route path="/" element={<Layout />} >
              <Route index element={<Products />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product_id" element={<ProductDetails />} />
              <Route path="admin" element={<BoardAdmin />} />
              <Route path="user" element={<BoardUser />} />
          </Route>
        </Routes>
      </>
  );
}

export default App;
