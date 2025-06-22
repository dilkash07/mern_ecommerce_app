import React, { useState } from "react";
import { Stepper } from "react-form-stepper";
import PyamentDetails from "../../components/payment/PyamentDetails";
import { CiCreditCard1 } from "react-icons/ci";
import { IoMdCash } from "react-icons/io";
import { newOrder } from "../../services/operations/OrderAPI";
import CardForm from "../../components/payment/CardForm";
import CashForm from "../../components/payment/CashForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../../components/checkout/Header";

const CheckoutPayment = () => {
  const [paymentMode, setPaymentMode] = useState("Cash");
  const stripePromise = loadStripe(
    "pk_test_51PlSbhRpMSThw0NkAkUxqyrFvmPZEvpxYWC7IY3VCkShjgonjXF5K06vnknMZiclz5zIrGmBRTFWRNQ8WbLW4iKn00T0DGNHub"
  );

  const submitHandler = (data) => {
    console.log("hello jee");
  };

  return (
    <div>
      <Header activeStep={3} />
      <div className="max-w-7xl mx-auto px-5">
        <div className="border-b border-orange-100 py-4 mb-10">
          <h1 className="italic text-3xl mb-3">Payment</h1>
        </div>
        <div className="h-screen w-full flex justify-center gap-10 flex-wrap">
          <div className="flex gap-2 flex-col">
            <h2 className="font-bold">Choose Payment Mode</h2>
            <div className="max-w-4xl h-max border rounded-lg flex flex-col md:flex-row">
              <div className="w-full md:max-w-fit flex flex-col bg-gray-100 rounded-tl-lg rounded-bl-lg font-semibold text-gray-700 text-left cursor-pointer">
                <p
                  className={`${
                    paymentMode === "cash"
                      ? "px-2 py-4 border-l-4 border-orange-500 text-orange-500 mr-[1px] flex gap-2 items-center"
                      : "px-2 py-4 ml-1 border-b border-r flex gap-2 items-center"
                  }`}
                  onClick={() => setPaymentMode("cash")}
                >
                  <IoMdCash size={20} className="text-gray-700" /> Cash on
                  Delivery
                </p>
                <p
                  className={`${
                    paymentMode === "card"
                      ? "px-2 py-4 border-l-4 border-orange-500 text-orange-500 mr-[1px] flex gap-2 items-center"
                      : "px-2 py-4 ml-1 border-t border-r flex gap-2 items-center"
                  }`}
                  onClick={() => setPaymentMode("card")}
                >
                  <CiCreditCard1 size={20} className="text-gray-700" />{" "}
                  Credit/Debit Card
                </p>
                <div className="border-t"></div>
              </div>
              <div className="w-[28rem]">
                {paymentMode === "Cash" && (
                  <CashForm paymentMethod={paymentMode} />
                )}
                {paymentMode === "Card" && (
                  <Elements stripe={stripePromise}>
                    <CardForm paymentMethod={paymentMode} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
          <div>{<PyamentDetails />}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayment;
