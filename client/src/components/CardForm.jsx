import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { paymentEndpoints } from "../services/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

const CardForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.order);
  const { PROCESS_PAYMENT_API } = paymentEndpoints;

  let orderItem = [];
  let PaymentIfno = {};

  cart?.items?.map((item) => {
    orderItem.push({
      title: item.product.title,
      brand: item.product.brand,
      price: item.product.sellingPrice,
      quantity: item.quantity,
      thumbnail: item.product.thumbnail.image_url,
      product: item.product._id,
    });
  });

  const paymentData = {
    amount: Math.round(cart.totalAmount * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(PROCESS_PAYMENT_API, paymentData);

      console.log("data----------- ", data);

      // const response = await stripe.confirmCardPayment(data.client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardNumberElement),
      //     billing_details: {
      //       name: user.firstName + user.lastName,
      //       email: user.email,
      //       address: {
      //         line1: shippingInfo.address,
      //         city: shippingInfo.city,
      //         state: shippingInfo.state,
      //         postal_code: shippingInfo.pincode,
      //       },
      //     },
      //   },
      // });

      // console.log("response: ----------- ", response);

      // if (response.error) {
      //   (payBtn.current.disabled = false), toast.error(response.error.message);
      // } else {
      //   if (response.paymentIntent.status === "succeeded") {
      //     PaymentIfno = {
      //       id: response.paymentIntent.id,
      //       status: response.paymentIntent.status,
      //     };

      //     dispatch(
      //       newOrder(
      //         shippingInfo,
      //         orderItem,
      //         PaymentIfno,
      //         token,
      //         payBtn,
      //         navigate
      //       )
      //     );
      //   } else {
      //     toast.error("Something went wrong while processing payment");
      //   }
      // }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: "Dilkash Raza", // Replace with actual customer name
          },
        },
      });

      console.log("result: ", result);
      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
      }
    } catch (error) {
      payBtn.current.disabled = false;
      // toast.error(error.response.data.message);
      // console.log(error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold mb-2">Credit/ Debit Card</h1>
      <p className="text-sm mb-5">
        Please Ensure your card can be used for online transactions.
      </p>

      <form className="w-full flex flex-col gap-5" onSubmit={submitHandler}>
        <label className="w-full relative">
          <CardNumberElement className="w-full rounded-md p-2.5 border shadow-sm shadow-red-400" />
          <FaCreditCard
            size={20}
            className="absolute top-2.5 right-3 text-teal-700"
          />
        </label>

        <div className="flex gap-3 mb-10">
          <div className="w-full  flex flex-col">
            <CardExpiryElement className="w-full rounded-md p-2.5 border shadow-sm shadow-red-400" />
          </div>
          <div className="w-full flex flex-col">
            <CardCvcElement className="w-full rounded-md p-2.5 border shadow-sm shadow-red-400" />
          </div>
        </div>
        <button
          className="w-full bg-orange-500 px-5 py-2.5 text-white text-xl rounded-md mb-3"
          ref={payBtn}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CardForm;
