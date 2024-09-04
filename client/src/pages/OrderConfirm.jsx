import React from "react";
import { GiConfirmed } from "react-icons/gi";
import { IoIosArrowForward } from "react-icons/io";
import { BsMagic } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CiDeliveryTruck } from "react-icons/ci";
import deliverBoy from "../assets/delivery_boy.png";
import { useSelector } from "react-redux";

const OrderConfirm = () => {
  // const { shippingInfo } = useSelector((state) => state.order);

  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo"));
  return (
    <div className="max-w-7xl mx-auto px-5 py-20">
      <div className="w-10/12 md:w-1/2 mx-auto">
        <div className="text-orange-500 text-2xl font-bold flex flex-col items-center gap-5">
          <GiConfirmed size={40} />
          <p>Order Confirmed</p>
        </div>
        <p className="text-center">
          Your order is confirmed. You will receive and order confimation email
          shortly with the expected delivery date for your items.
        </p>
      </div>
      <div className="w-10/12 md:w-1/2 mx-auto text-sm">
        <div className="flex justify-between items-center mt-10">
          <div>
            <p className="mb-2">Delivering to:</p>
            <p className="font-bold">
              {shippingInfo?.name} | {shippingInfo?.mobile}
            </p>
            <p className="text-xs text-gray-700">
              {shippingInfo?.address}, {shippingInfo?.locality},{" "}
              {shippingInfo?.city}, {shippingInfo?.state}-
              {shippingInfo?.pincode}
            </p>

            <Link
              to={"/order"}
              className="text-orange-500 text-xs font-bold flex items-center justify-center border border-orange-500 rounded px-2 py-1.5 w-fit my-3"
            >
              Order Details <IoIosArrowForward size={15} className="mt-0.5" />
            </Link>
          </div>
          <div>
            <img src={deliverBoy} alt="Delivery" className="max-w-32" />
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <BsMagic />
          <p>You can Track/View/Modify order from order</p>
        </div>
      </div>
      <div className="w-10/12 md:w-1/2 mx-auto flex gap-2 text-sm font-bold my-10">
        <Link
          to={"/"}
          className="w-1/2 text-center px-2 py-1.5 text-orange-500 border border-orange-500 rounded"
        >
          Continue Shopping
        </Link>
        <Link
          to={"/order"}
          className="w-1/2 text-center px-2 py-1.5 text-white bg-orange-500 rounded"
        >
          View Order
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirm;
