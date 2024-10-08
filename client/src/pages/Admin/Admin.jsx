import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/admin/Header";
import Sidenav from "../../components/admin/Sidenav";
import { useDispatch } from "react-redux";
import {
  getUsers,
  getOrders,
  getProducts,
} from "../../services/operations/AdminAPI";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUsers());
    dispatch(getProducts());
  }, []);

  return (
    <div className="min-h-screen w-screen">
      <Header />
      <div className="flex gap-5">
        <Sidenav />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
