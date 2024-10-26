import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/admin/Header";
import Sidenav from "../../components/admin/Sidenav";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  getOrders,
  getOrdersAndRevenue,
  getProducts,
} from "../../services/operations/AdminAPI";

const Admin = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrdersAndRevenue(token));
    dispatch(getOrders(token));
    dispatch(getUsers(token));
    dispatch(getProducts(token));
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
