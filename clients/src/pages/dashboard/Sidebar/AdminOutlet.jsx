import React from "react";
// components
// css
import "./AdminOutlet.css";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminOutlet = () => {
  return (
    <>

      {/* Here is the main */}
      <div className="sidebar_div_parent">
        <AdminSidebar />
        <div className="scrollable_container">
          <Outlet />
        </div>
      </div>


    </>
  );
};

export default AdminOutlet;