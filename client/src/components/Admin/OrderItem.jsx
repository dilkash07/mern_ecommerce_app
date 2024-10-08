import React from "react";
import { useDispatch } from "react-redux";
import { FiPackage } from "react-icons/fi";
import {
  formattedDate,
  formattedNumericDate,
} from "../../utils.jsx/dateFormatter";
import { formattedDay } from "../../utils.jsx/dayFormatter";
import { updateOrderStatus } from "../../services/operations/AdminAPI";
import { formattedINR } from "../../utils.jsx/inrFormatter";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();
  const UPDATE_ORDER_STATUS_API = `http://localhost:4000/api/v1/admin/updateOrderStatus/${order._id}`;

  const ChangeHandler = (event) => {
    dispatch(updateOrderStatus(event.target.value, UPDATE_ORDER_STATUS_API));
  };

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

      <div className="w-full rounded p-5 bg-gray-100 flex gap-5 mt-5 relative">
        <div className="h-24 w-24 rounded bg-white grid place-items-center">
          <img
            src={order.orderItem.thumbnail}
            alt={order.orderItem.brand}
            className="max-w-20 max-h-20"
          />
        </div>

        <div className="w-full flex justify-evenly gap-5">
          <div className="w-1/3 text-sm text-gray-500">
            <p className="font-bold mb-2">{order.orderItem.brand}</p>
            <p>{order.orderItem.title}</p>
          </div>

          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              <p className="font-bold mb-2">{order.shippingInfo.name}</p>
              <p>{order.shippingInfo.address}</p>
              <p>
                {order.shippingInfo.city}, {order.shippingInfo.state},{" "}
                {order.shippingInfo.pincode}
              </p>
              <p>{order.shippingInfo.mobile}</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p className="font-bold mb-2">Item: {order.orderItem.quantity}</p>
            <p>Method: {order.paymentMethod}</p>
            <p>Payment: {order.paymentInfo.status}</p>
            <p>Date: {formattedNumericDate(order.createdAt)}</p>
          </div>

          <div className="text-sm font-bold text-gray-500">
            <p>₹ {formattedINR(order.orderItem.price)}</p>
          </div>

          <div>
            <select
              className="px-2 py-1 outline-none border rounded-md"
              onChange={ChangeHandler}
              value={order.orderStatus}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
