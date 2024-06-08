import React from "react";
import { useState, useEffect } from "react";
import feeShipping from "../assets/freeShipping.webp";
import easyReturn from "../assets/easyReturn.webp";
import securePayment from "../assets/securePayment.webp";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";

const PriceDetails = ({ cart }) => {
  const [totalAmount, setTotalAmount] = useState();
  const [totalMrp, setTotalMrp] = useState();
  const [discountMrp, setDiscountMrp] = useState();

  useEffect(() => {
    // total amount
    setTotalAmount(
      cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
    );

    // total mrp
    setTotalMrp(
      cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0) +
        cart.reduce(
          (acc, cur) =>
            acc +
            Math.round(
              (cur.discountPercentage * cur.price * cur.quantity) / 100
            ),
          0
        )
    );

    // total discount
    setDiscountMrp(
      cart.reduce(
        (acc, cur) =>
          acc +
          Math.round((cur.discountPercentage * cur.price * cur.quantity) / 100),
        0
      )
    );
  }, [cart]);

  return (
    <div className=" min-w-80 py-10 leading-8">
      <div className="leading-10">
        <h1 className="text-xl font-semibold">ORDER SUMMARY</h1>
        <p className="text-gray-700">PRICE DETAILS ({cart.length} Items)</p>
      </div>
      <div className="text-gray-600 text-sm font-normal border-b border-orange-100">
        <div className="flex justify-between">
          <p>Total MRP</p>
          <p>₹{totalMrp}</p>
        </div>
        <div className="flex justify-between">
          <p>Discount on MRP</p>
          <p className="text-green-600">-₹{discountMrp}</p>
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
        <p>₹{totalAmount}</p>
      </div>

      <button className=" bg-orange-600 w-full px-5 py-2 text-white text-xl">
        Place Order
      </button>

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

export default PriceDetails;
