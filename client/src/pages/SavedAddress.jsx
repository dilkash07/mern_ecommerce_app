import React from "react";
import { FaPlus } from "react-icons/fa6";

const SavedAddress = () => {
  return (
    <div className="p-5">
      <h1 className="mb-14 text-3xl font-medium">Saved Address</h1>
      <button className="flex items-center font-bold px-5 py-2 border text-orange-600 border-orange-600 rounded-md mb-10">
        <FaPlus size={12} />
        Add New Address
      </button>
      <div>
        <h1 className="font-bold">Default Address</h1>
        <div className="border rounded-md">
          <div className="text-gray-500 leading-tight text-sm p-5">
            <p className="font-semibold text-gray-600 mb-3">Dilkash Raza</p>
            <p>48, Near New Masjid Kharahara, Barahat</p>
            <p>Banka</p>
            <p>Banka-813102</p>
            <p>Bihar</p>
            <br />
            <p>Mobile: 7360807339</p>
            <p className="font-semibold mt-4 text-teal-500 hidden">
              Make This Default
            </p>
          </div>
          <div className="flex justify-between text-lg font-semibold text-orange-600 border-t p-2">
            <button className="w-1/2 border-r">Edit</button>
            <button className="w-1/2">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedAddress;
