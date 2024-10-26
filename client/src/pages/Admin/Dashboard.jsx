import React from "react";
import { useSelector } from "react-redux";
import { formattedINR } from "../../utils.jsx/inrFormatter";

const Dashboard = () => {
  const { ordersAndRevenue } = useSelector((state) => state.admin);

  return (
    <div className="h-screen w-full overflow-scroll scrollbar-none max-w-7xl mx-auto px-5 relative">
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">Dashboard</h1>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-semibold">Orders</h1>
        <div className="w-full flex gap-10">
          <div className="w-full bg-orange-200 shadow-md px-5 py-2 text-center ">
            <p className="text-lg font-semibold">TODAY</p>
            <p className="text-3xl text-orange-800 font-bold">
              {ordersAndRevenue?.day.totalOrders}
            </p>
            <p className="text-lg text-gray-800">
              {ordersAndRevenue?.day.totalOrders} orders today
            </p>
          </div>
          <div className="w-full bg-orange-200 shadow-md px-5 py-2 text-center ">
            <p className="text-lg font-semibold">THIS WEEK</p>
            <p className="text-3xl text-orange-800 font-bold">
              {ordersAndRevenue?.week.totalOrders}
            </p>
            <p className="text-lg text-gray-800">
              {ordersAndRevenue?.week.totalOrders} orders this week
            </p>
          </div>
          <div className="w-full bg-orange-200 shadow-md px-5 py-2 text-center ">
            <p className="text-lg font-semibold">THIS MONTH</p>
            <p className="text-3xl text-orange-800 font-bold">
              {ordersAndRevenue?.month.totalOrders}
            </p>
            <p className="text-lg text-gray-800">
              {ordersAndRevenue?.month.totalOrders} orders this month
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <h1 className="text-lg font-semibold">Revenue</h1>
        <div className="w-full flex gap-10">
          <div className="w-full bg-orange-200 shadow-md px-5 py-2 text-center ">
            <p className="text-lg font-semibold">TODAY</p>
            <p className="text-3xl text-orange-800 font-bold">
              ₹ {formattedINR(ordersAndRevenue?.day.totalRevenue)}
            </p>
            <p className="text-lg text-gray-800">
              {ordersAndRevenue?.day.totalOrders} orders today
            </p>
          </div>
          <div className="w-full bg-orange-200 shadow-md px-5 py-2 text-center ">
            <p className="text-lg font-semibold">THIS WEEK</p>
            <p className="text-3xl text-orange-800 font-bold">
              ₹ {formattedINR(ordersAndRevenue?.week.totalRevenue)}
            </p>
            <p className="text-lg text-gray-800">
              {ordersAndRevenue?.week.totalOrders} orders this week
            </p>
          </div>
          <div className="w-full bg-orange-200 shadow-md px-5 py-2 text-center ">
            <p className="text-lg font-semibold">THIS MONTH</p>
            <p className="text-3xl text-orange-800 font-bold">
              ₹ {formattedINR(ordersAndRevenue?.month.totalRevenue)}
            </p>
            <p className="text-lg text-gray-800">
              {ordersAndRevenue?.month.totalOrders} orders this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
