import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newOrder } from "../../services/operations/OrderAPI";
import { useNavigate } from "react-router-dom";

const CashForm = ({ paymentMethod }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const payBtn = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.order);

  let orderItem = [];
  const PaymentIfno = {};

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

  const submitHandler = () => {
    dispatch(
      newOrder(
        shippingInfo,
        orderItem,
        PaymentIfno,
        paymentMethod,
        token,
        payBtn,
        navigate
      )
    );
  };
  return (
    <div className="p-5">
      <h1 className="text-lg font-semibold mb-2">
        Cash On Delivery (Cash/UPI)
      </h1>
      <p className="text-sm mb-10">You can pay via Cash/UPI on delivery.</p>
      <button
        className="w-full bg-orange-500 px-5 py-2.5 text-white text-xl rounded-md mb-3"
        ref={payBtn}
        onClick={submitHandler}
      >
        Place Order
      </button>
    </div>
  );
};

export default CashForm;
