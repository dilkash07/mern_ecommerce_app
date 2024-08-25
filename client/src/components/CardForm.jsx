import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { paymentEndpoints } from "../services/apis";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const submitHandler = async (data) => {
    payBtn.current.disabled = true;

    try {
      const { data } = await axios.post(PROCESS_PAYMENT_API, paymentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const response = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.cardNumber,
          billing_details: {
            name: user.firstName,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
            },
          },
        },
      });

      if (response.error) {
        (payBtn.current.disabled = false), toast.error(response.error.message);
      } else {
        if (response.paymentIntent.status === "succeeded") {
          PaymentIfno = {
            id: response.paymentIntent.id,
            status: response.paymentIntent.status,
          };

          dispatch(
            newOrder(
              shippingInfo,
              orderItem,
              PaymentIfno,
              token,
              payBtn,
              navigate
            )
          );
        } else {
          toast.error("Something went wrong while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold mb-2">Credit/ Debit Card</h1>
      <p className="text-sm mb-3">
        Please Ensure your card can be used for online transactions.
      </p>
      <form
        className="w-full flex flex-col gap-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="w-full relative">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            className="w-full rounded-md p-2.5 border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("cardNumber", { required: true })}
          />
          <FaCreditCard
            size={20}
            className="absolute top-3 right-3 text-teal-700"
          />
          {errors.cardNumber && (
            <span className="-mt-1 text-[12px] text-red-600">
              Please enter your card number.
            </span>
          )}
        </label>

        <div className="w-full">
          <input
            type="text"
            name="cardName"
            placeholder="Name on Card"
            className="w-full rounded-md p-2.5  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("cardName", { required: true })}
          />
          {errors.cardName && (
            <span className="-mt-1 text-[12px] text-red-600">
              Please enter your card name.
            </span>
          )}
        </div>
        <div className="flex gap-3 mb-10">
          <div className="w-full  flex flex-col">
            <input
              type="text"
              name="expiry"
              placeholder="Valid Thru (MM/YY)"
              className="md:w-full rounded-md p-2.5  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
              {...register("expiry", { required: true })}
            />
            {errors.expiry && (
              <span className="mt-1 text-[12px] text-red-600">
                Please enter your card expiry.
              </span>
            )}
          </div>
          <div className="w-full flex flex-col">
            <input
              type="text"
              name="CVV"
              placeholder="CVV"
              className="w-full rounded-md p-2.5  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
              {...register("CVV", { required: true })}
            />
            {errors.CVV && (
              <span className="mt-1 text-[12px] text-red-600">
                Please enter your CVV.
              </span>
            )}
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
