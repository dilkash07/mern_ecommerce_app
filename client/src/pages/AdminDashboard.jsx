import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Product from "./Product";

const AdminDashboard = () => {
  return (
    <div className="h-screen flex">
      <div className=" w-1/5 bg-orange-200">
        <div>
          <Link to="/anda">Upload Product</Link>
        </div>
      </div>
      <div className=" w-4/5 flex justify-center items-center bg-gray-200"></div>
    </div>
  );
};

export default AdminDashboard;
