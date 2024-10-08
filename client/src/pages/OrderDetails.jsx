import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../services/operations/OrderAPI";
import { RxCross1 } from "react-icons/rx";
import { deliveryDate } from "../utils.jsx/dateFormatter";
import RecommendedCard from "../components/RecommendedCard";
import { formattedINR } from "../utils.jsx/inrFormatter";
import { IoMdCash } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import Header from "../components/core/Header";
import Footer from "../components/core/Footer";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const API_URL = `http://localhost:4000/api/v1/order/getOrderDetails/${id}`;

  useEffect(() => {
    dispatch(getOrderDetails(API_URL));
  }, [id]);

  const { orderItem } = useSelector((state) => state.order);
  const { recommendedProduct } = useSelector((state) => state.product);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto p-5">
        <div className="w-full flex flex-col items-center bg-gray-100">
          <div className="grid place-items-center p-5">
            <img
              src={orderItem?.orderItem?.thumbnail}
              alt={`${orderItem?.orderItem?.brand}`}
              className="max-w-60"
            />
            <div className="text-center leading-7 mt-5">
              <p className="text-md font-bold">{orderItem?.orderItem?.brand}</p>
              <p>{orderItem?.orderItem?.title}</p>
              <p>Qty: {orderItem?.orderItem?.quantity} items</p>
            </div>
          </div>
          <div className="w-9/12 bg-white shadow-md p-5 flex items-center mb-10">
            {orderItem?.orderStatus === "Cancelled" ? (
              <div className="flex gap-5">
                <div className="h-8 w-8 bg-gray-200 rounded-full grid place-items-center">
                  <RxCross1 />
                </div>
                <div>
                  <p className="text-lg font-bold">Cancelled</p>
                  <p>as per your request</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-orange-500 text-lg font-bold">
                  Order {orderItem?.orderStatus}
                </p>
                <p>
                  order deliverd on{" "}
                  {deliveryDate(
                    orderItem?.createdAt,
                    orderItem?.orderItem?.product?.estimatedDelivery
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
        {recommendedProduct?.length > 0 && (
          <div>
            <h1 className="text-xl font-bold m-2 mt-4">Similar Items</h1>
            <div className="w-full flex gap-5 overflow-x-scroll py-2">
              {recommendedProduct?.map((item) => (
                <RecommendedCard item={item} />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between text-md font-bold mt-10">
          <div>
            <h1>Total Order Price</h1>
            <p className="font-medium text-gray-500">
              You saved{" "}
              <span className="text-orange-500 font-bold">
                ₹
                {(orderItem?.orderItem?.product?.price -
                  orderItem?.orderItem?.product?.sellingPrice) *
                  orderItem?.orderItem?.quantity}{" "}
              </span>
              on this order
            </p>
          </div>
          <div className="text-right">
            <p>
              ₹{" "}
              {formattedINR(
                orderItem?.orderItem?.price * orderItem?.orderItem?.quantity
              )}
            </p>
            <button className="text-orange-500">View Breakup</button>
          </div>
        </div>
        <div className="w-full px-5 py-3 bg-gray-100 rounded mt-5">
          {orderItem?.paymentMethod === "cash" ? (
            <p className="flex gap-2 items-center">
              <IoMdCash size={20} className="text-gray-700" /> Pay on Delivery.
            </p>
          ) : (
            <p>Paid</p>
          )}
        </div>
        <div className="px-5 py-3 mt-2">
          <p className="">Sold by: MansuriMart</p>
          <p className="">Order ID # {orderItem._id}</p>
        </div>
        <div className="px-5 py-3 mt-2">
          <p className="text-lg font-bold">Updates sent to</p>
          <p className="flex gap-1 items-center text-gray-500">
            <MdOutlineMail />
            {orderItem?.user?.email}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
