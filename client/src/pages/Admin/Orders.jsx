import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "../../components/Admin/OrderItem";

const Orders = () => {
  const { orders } = useSelector((state) => state.admin);

  return (
    <div className="h-screen overflow-scroll scrollbar-none max-w-7xl mx-auto px-5">
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">Orders</h1>
      </div>

      {orders?.map((order) => (
        <OrderItem order={order} key={order._id} />
      ))}
    </div>
  );
};

export default Orders;
