import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "../../components/admin/OrderItem";
import Loader from "../../components/admin/Loader";

const Orders = () => {
  const { orders } = useSelector((state) => state.admin);
  const { loading } = useSelector((state) => state.loader);

  return (
    <div className="h-screen w-full overflow-scroll scrollbar-none max-w-7xl mx-auto px-5 relative">
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">Orders</h1>
      </div>

      {loading && <Loader />}
      {orders?.map((order) => (
        <OrderItem order={order} key={order._id} />
      ))}
    </div>
  );
};

export default Orders;
