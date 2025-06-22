import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddAddress from "../../components/address/AddAddress";
import CheckoutDetails from "../../components/checkout/CheckoutDetails";
import toast from "react-hot-toast";
import { setShippingInfo } from "../../redux/slice/OrderSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Header from "../../components/checkout/Header";

const CheckoutAddress = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.user);
  const [showAddress, setShowAddres] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [isAddress, setIsAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const addHandler = () => {
    setShowAddres(true);
    setIsAddress(null);
  };

  const defaultHandler = (addressId) => {
    dispatch(makeDefaultAddress(token, addressId));
  };
  const editHandler = (address) => {
    setIsAddress(address);
    setShowAddres(true);
  };
  const removeHandler = (addressId) => {
    dispatch(removeAddress(token, addressId));
  };

  const paymentHandler = () => {
    if (selectedAddress === null) {
      return toast.error("Please add address");
    } else {
      dispatch(setShippingInfo(selectedAddress));
      navigate("/checkout/payment");
    }
  };

  // const makePayment = async () => {
  //   const stripe = await loadStripe(
  //     "pk_test_51PlSbhRpMSThw0NkAkUxqyrFvmPZEvpxYWC7IY3VCkShjgonjXF5K06vnknMZiclz5zIrGmBRTFWRNQ8WbLW4iKn00T0DGNHub"
  //   );
  //   const body = {
  //     product: cart.items,
  //   };
  // };

  return (
    <div>
      <Header activeStep={2} />
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex gap-2 items-center border-b border-orange-100 py-4">
          <h1 className="italic text-3xl mb-3">Checkout</h1>
          <p className="border-l border-black pl-2 ml-2">
            <span className="text-gray-600 text-md">
              {cart?.items?.length} Items
            </span>
          </p>
        </div>
        <div className="w-full flex justify-center gap-10 flex-wrap">
          <div className="max-w-3xl w-[768px]">
            <div className="flex justify-between mt-10">
              <h1 className="text-xl font-semibold">Select Delivey Address</h1>
              <button
                className="flex items-center h-fit font-bold px-5 py-2 border text-orange-600 border-orange-600 rounded-md mb-10"
                onClick={addHandler}
              >
                <FaPlus size={12} />
                Add New Address
              </button>

              {showAddress && (
                <div className="h-screen w-screen fixed top-0 right-0 bg-white bg-opacity-50 flex justify-center items-center p-5">
                  <AddAddress
                    setShowAddress={setShowAddres}
                    address={isAddress}
                  />
                </div>
              )}
            </div>
            <div>
              {address?.map((address, key) => (
                <div className="mb-10" key={key}>
                  <h1 className="font-bold">
                    {address?.defaultAddress
                      ? "Default Address"
                      : "Other Address"}
                  </h1>
                  <label>
                    <div
                      className={
                        selectedAddress === address?._id
                          ? `shadow-md border rounded-md flex gap-3 p-5`
                          : `border rounded-md flex gap-3 p-5`
                      }
                    >
                      <input
                        type="radio"
                        name="address"
                        className="size-4"
                        value={address}
                        // defaultChecked={address?.defaultAddress}
                        onClick={() => setSelectedAddress(address._id)}
                      />
                      <div className="text-gray-500 leading-tight text-sm">
                        <div className="flex gap-3 mb-3">
                          <p className="font-semibold text-gray-600">
                            {address?.name}
                          </p>
                          <p className="text-xs font-bold px-1.5 text-orange-500 border border-orange-500 rounded-full">
                            {address?.addressType}
                          </p>
                        </div>
                        <p>
                          {address?.address}, {address?.locality}
                        </p>
                        <p>
                          {address?.city}, {address?.state}-{address?.pincode}
                        </p>
                        <br />
                        <p>Mobile: {address?.mobile}</p>
                        <div
                          className={
                            selectedAddress === address?._id
                              ? `block`
                              : `hidden`
                          }
                        >
                          {!address?.defaultAddress && (
                            <p
                              className="font-semibold mt-4 text-teal-500 cursor-pointer"
                              onClick={() => defaultHandler(address._id)}
                            >
                              Make This Default
                            </p>
                          )}
                          <div className="flex gap-5 text-md font-semibold text-orange-500 mt-5">
                            <button
                              className="px-3 py-1 border border-orange-500 rounded-md"
                              onClick={() => removeHandler(address._id)}
                              value={address}
                            >
                              Remove
                            </button>
                            <button
                              className="px-3 py-1 border border-orange-500 rounded-md"
                              onClick={() => editHandler(address)}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>{<CheckoutDetails paymentHandler={paymentHandler} />}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
