import React from "react";
import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Login from "./pages/login/Login";

const App = () => {
  const ProtectedRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/Login" />;
    }
    return children;
  };
  return (
    <BrowserRouter>
      <Topbar />
      <div className="appContainer">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                {" "}
                <Home />{" "}
              </ProtectedRoutes>
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userid" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />

          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productid" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
