import React from "react";
import OrderItem from "../components/OrderItem";
import { useSelector } from "react-redux";

const Order = () => {
  const { orders } = useSelector((state) => state.order);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">My Orders</h1>
      </div>

      {orders?.map((order) => (
        <OrderItem order={order} key={order._id} />
      ))}
    </div>
  );
};

export default Order;
