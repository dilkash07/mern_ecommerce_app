import React from "react";
import { FiPackage } from "react-icons/fi";
import { formattedDate } from "../utils.jsx/dateFormatter";
import { formattedDay } from "../utils.jsx/dayFormatter";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  return (
    <div className="rounded m-5 border p-5 flex flex-col justify-between">
      <div className="text-md md:text-lg font-bold text-orange-500 flex gap-3">
        <p className="h-10 w-10 grid place-items-center rounded-full bg-gray-200">
          <FiPackage size={24} />
        </p>
        <div>
          <p>Order {order.orderStatus}</p>
          <p className="text-sm font-normal text-gray-500">
            on {formattedDay(order.updatedAt)}, {formattedDate(order.updatedAt)}
          </p>
        </div>
      </div>

      <Link to={`/order/details/${order._id}`}>
        <div className="w-full rounded p-5 bg-gray-100 flex gap-5 mt-5 hover:bg-gray-200 relative">
          <div className="h-24 w-24 rounded bg-white grid place-items-center">
            <img
              src={order.orderItem.thumbnail}
              alt={order.orderItem.brand}
              className="max-w-20 max-h-20"
            />
          </div>
          <div className="leading-8">
            <p className="font-bold">{order.orderItem.brand}</p>
            <p className="text-sm text-gray-500">{order.orderItem.title}</p>
            <p className="text-sm text-gray-500">
              Qty: {order.orderItem.quantity}
            </p>
          </div>

          <IoIosArrowForward
            size={20}
            className="text-gray-600 absolute top-[45%] right-1.5 md:right-3"
          />
        </div>
      </Link>
    </div>
  );
};

export default OrderItem;
