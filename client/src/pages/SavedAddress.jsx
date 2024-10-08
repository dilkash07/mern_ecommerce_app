import React, { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddAddress from "../components/AddAddress";
import { useDispatch, useSelector } from "react-redux";
import {
  makeDefaultAddress,
  removeAddress,
} from "../services/operations/AddressAPI";
import Header from "../components/core/Header";
import Footer from "../components/core/Footer";

const SavedAddress = () => {
  const dispatch = useDispatch();
  const [showAddress, setShowAddres] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.user);
  const [isAddress, setIsAddress] = useState(null);

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

  return (
    <div>
      <Header />
      <div className="min-h-screen max-w-7xl mx-auto px-5 relative">
        <div className="border-b border-orange-100 py-4 mb-10">
          <h1 className="italic text-3xl mb-3">Saved Address</h1>
        </div>
        <button
          className="flex items-center font-bold px-5 py-2 border text-orange-600 border-orange-600 rounded-md mb-10"
          onClick={addHandler}
        >
          <FaPlus size={12} />
          Add New Address
        </button>

        {showAddress && (
          <div className="h-screen w-screen fixed top-0 right-0 bg-white bg-opacity-50 flex justify-center items-center p-5">
            <AddAddress setShowAddress={setShowAddres} address={isAddress} />
          </div>
        )}

        {address?.map((address, key) => (
          <div className="mb-10" key={key}>
            <h1 className="font-bold">
              {address?.defaultAddress ? "Default Address" : "Other Address"}
            </h1>
            <div className="border shadow-md rounded-md">
              <div className="text-gray-500 leading-tight text-sm p-5">
                <div className="flex justify-between">
                  <p className="font-semibold text-gray-600">{address?.name}</p>
                  <p className="text-xs font-bold text-white mt-3 px-2 pt-0.5 pb-1 bg-orange-500 rounded-full">
                    {address?.addressType}
                  </p>
                </div>
                <p>{address?.address}</p>
                <p>{address?.locality}</p>
                <p>
                  {address?.city}-{address?.pincode}
                </p>
                <p>{address?.state}</p>
                <br />
                <p>Mobile: {address?.mobile}</p>
                {!address?.defaultAddress && (
                  <p
                    className="font-semibold mt-4 text-teal-500 cursor-pointer"
                    onClick={() => defaultHandler(address._id)}
                  >
                    Make This Default
                  </p>
                )}
              </div>
              <div className="flex justify-between text-lg font-semibold text-orange-500 border-t p-2">
                <button
                  className="w-1/2 border-r"
                  onClick={() => editHandler(address)}
                >
                  Edit
                </button>
                <button
                  className="w-1/2"
                  onClick={() => removeHandler(address._id)}
                  value={address}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SavedAddress;
