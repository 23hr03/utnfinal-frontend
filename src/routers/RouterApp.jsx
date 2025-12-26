import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Home from "../pages/Home";

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* RUTAS PROTEGIDAS */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Layout>
                <Products />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
            
                <Profile />
              
            </ProtectedRoute>
          }
          
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home/>
              </Layout>
            </ProtectedRoute>
          }
          
        />
      </Routes>
      
    </BrowserRouter>
  );
};

export default RouterApp;
