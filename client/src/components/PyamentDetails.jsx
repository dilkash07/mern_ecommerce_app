import React from "react";
import feeShipping from "../assets/freeShipping.webp";
import easyReturn from "../assets/easyReturn.webp";
import securePayment from "../assets/securePayment.webp";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";
import { formattedINR } from "../utils.jsx/inrFormatter";

const PyamentDetails = () => {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className="min-w-80 py-5 leading-8">
      <div className="mb-2">
        <p className="text-gray-700 text-xs font-bold">
          PRICE DETAILS ({cart?.items?.length} Items)
        </p>
      </div>
      <div className="text-gray-600 text-sm font-normal border-b border-orange-100">
        <div className="flex justify-between">
          <p>Total MRP</p>
          <p>₹{formattedINR(cart.totalMrp)}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount on MRP</p>
          <p className="text-green-600">-₹{formattedINR(cart.discountOnMrp)}</p>
        </div>
        <div className="flex justify-between">
          <p>Counpon Discount</p>
          <p className="text-orange-600">Apply Coupon</p>
        </div>

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {" "}
            <span className=" line-through">₹79</span>{" "}
            <span className="text-green-600">Free</span>
          </p>
        </div>

        <div className="flex justify-between mb-3">
          <p>Convinience Charge</p>
          <p className="text-green-600">Free</p>
        </div>
      </div>
      <div className="flex justify-between font-semibold py-3">
        <h1>Total Amount</h1>
        <p>₹{formattedINR(cart.totalAmount)}</p>
      </div>

      <div className="flex justify-between items-center py-3 border-b border-orange-100">
        <div className="h-[106px] w-[106px] flex justify-center items-center flex-col gap-3">
          <div className=" h-[50px] w-[50px] bg-orange-200 rounded-full flex justify-center items-center">
            <img src={easyReturn} />
          </div>
          <p className="flex items-center flex-col leading-none">
            <span>Easy</span>
            <span>Returns</span>
          </p>
        </div>
        <div className="h-[106px] w-[106px] flex justify-center items-center flex-col gap-3">
          <div className=" h-[50px] w-[50px] bg-orange-200 rounded-full flex justify-center items-center">
            <img src={feeShipping} />
          </div>
          <p className="flex items-center flex-col leading-none">
            <span>Free</span>
            <span>Shipping</span>
          </p>
        </div>
        <div className="h-[106px] w-[106px] flex justify-center items-center flex-col gap-3">
          <div className=" h-[50px] w-[50px] bg-orange-200 rounded-full flex justify-center items-center">
            <img src={securePayment} />
          </div>
          <p className="flex items-center flex-col leading-none">
            <span>Secure</span>
            <span>Payments</span>
          </p>
        </div>
      </div>
      <div className="flex text-sm justify-between text-gray-600 py-5 border-b border-orange-100">
        <p className=" flex gap-1 items-center">
          <FiPhone size={20} />
          <span className=" underline">1800120000500</span>
        </p>
        <p className=" flex gap-1 items-center border-l pl-1 border-black">
          <TfiEmail size={20} />
          <span className="underline">care@mansurimart.com</span>
        </p>
      </div>
    </div>
  );
};

export default PyamentDetails;
