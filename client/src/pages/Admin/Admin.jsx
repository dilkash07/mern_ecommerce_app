import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../../components/Admin/Sidenav";
import { useDispatch } from "react-redux";
import { getOrders } from "../../services/operations/AdminOrdersAPI";

const Admin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className="min-h-screen w-screen">
      <div className="flex gap-5">
        <Sidenav />
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
