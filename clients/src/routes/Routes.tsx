import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

// Pages
import AdminOutlet from "../pages/dashboard/Sidebar/AdminOutlet";
import ErrorPage from "../pages/404/ErrorPage";
import Login from "../pages/Login/Login";

// Nested Pages
import Stats from "../pages/dashboard/nested/Stats/Stats";
import ProductRequests from "../pages/dashboard/nested/ProductRequests/ProductRequests";
import AllProducts from "../pages/dashboard/nested/AllProducts/AllProducts";
import VendorRequest from "../pages/dashboard/nested/VendorRequest/VendorRequest";
import ExpertRequests from "../pages/dashboard/nested/ExpertRequests/ExpertRequests";
import Logout from "../pages/dashboard/nested/Logout/Logout";

import AllCars from "../pages/dashboard/nested/AllCars/AllCars";
import UserManegment from "../pages/dashboard/nested/UserManegment/UserManegment";

const Routing = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<AdminOutlet />}>
          <Route path="/stats" element={<Stats />} />

          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/add" element={<ProductRequests />} />
          <Route path="/cars" element={<AllCars />} />
          <Route path="/users" element={<UserManegment />} />
          <Route path="/vendorrequest" element={<VendorRequest />} />
          <Route path="/expertrequests" element={<ExpertRequests />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<ErrorPage />} /> {/* Redirect to 404 page for unknown routes */}
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} /> {/* Redirect to 404 page for unknown routes */}
        </>
      )}
    </Routes>
  );
};

export default Routing;
