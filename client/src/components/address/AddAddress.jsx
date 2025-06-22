import React from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  updateAddress,
} from "../../services/operations/AddressAPI";

const AddAddress = ({ setShowAddress, address }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitAddress = (data) => {
    dispatch(
      address
        ? updateAddress(token, data, address._id)
        : addAddress(token, data)
    );
    setShowAddress(false);
  };

  return (
    <form
      className="h-4/5 max-w-md bg-orange-200 rounded-lg p-5 overflow-y-scroll scrollbar-none"
      onSubmit={handleSubmit(submitAddress)}
    >
      <h1 className="text-lg font-bold mb-4">
        {address ? "Update Address" : "Add Address"}
      </h1>
      <div className="w-full flex flex-col gap-2">
        <label className="w-full">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Name<sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("name", { required: true })}
            defaultValue={address?.name}
          />
        </label>
        {errors.name && (
          <span className="-mt-1 text-[12px] text-red-600">
            Please enter your name.
          </span>
        )}
        <label className="w-full">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Mobile<sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile"
            className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("mobile", { required: true })}
            defaultValue={address?.mobile}
          />
        </label>
        {errors.mobile && (
          <span className="-mt-1 text-[12px] text-red-600">
            Please enter your mobile.
          </span>
        )}
        <div className="w-full md:flex gap-2">
          <label className="w-full">
            <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
              Pincode<sup className="text-red-600">*</sup>
            </p>
            <input
              type="text"
              name="pincode"
              placeholder="Enter pincode"
              className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
              {...register("pincode", { required: true })}
              defaultValue={address?.pincode}
            />
            {errors.pincode && (
              <span className="-mt-1 text-[12px] text-red-600">
                Please enter your pincode.
              </span>
            )}
          </label>
          <label className="w-full">
            <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
              State<sup className="text-red-600">*</sup>
            </p>
            <input
              type="text"
              name="state"
              placeholder="Enter state"
              className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
              {...register("state", { required: true })}
              defaultValue={address?.state}
            />
            {errors.state && (
              <span className="-mt-1 text-[12px] text-red-600">
                Please enter your state.
              </span>
            )}
          </label>
        </div>
        <label className="w-full">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Address (House No, Building, Street Area)
            <sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("address", { required: true })}
            defaultValue={address?.address}
          />
        </label>
        {errors.address && (
          <span className="-mt-1 text-[12px] text-red-600">
            Please enter your address.
          </span>
        )}
        <label className="w-full">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Locality/Town<sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            name="locality"
            placeholder="Enter Locality"
            className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("locality", { required: true })}
            defaultValue={address?.locality}
          />
        </label>
        {errors.locality && (
          <span className="-mt-1 text-[12px] text-red-600">
            Please enter your locality.
          </span>
        )}
        <label className="w-full">
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            City/District<sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            name="city"
            placeholder="Enter City"
            className="w-full rounded-md px-2 py-1  border-b outline-none shadow-sm shadow-red-400 focus:shadow-red-600"
            {...register("city", { required: true })}
            defaultValue={address?.city}
          />
        </label>
        {errors.city && (
          <span className="-mt-1 text-[12px] text-red-600">
            Please enter your city.
          </span>
        )}
        <div>
          <p className="text-[0.875rem] pl-[2px] mb-1 leading-[1.375rem]">
            Type of Address<sup className="text-red-600">*</sup>
          </p>
          <div className="flex gap-10">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="addressType"
                value={"home"}
                className="size-4"
                {...register("addressType")}
                defaultChecked={
                  address ? address?.addressType === "home" : true
                }
              />
              <span>Home</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="addressType"
                value={"office"}
                className="size-4"
                {...register("addressType")}
                defaultChecked={address?.addressType === "office"}
              />
              <span>Office</span>
            </label>
          </div>
        </div>
        <label className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            name="defaultAddress"
            className="size-4"
            {...register("defaultAddress")}
            defaultChecked={address ? address?.defaultAddress === true : true}
          />
          <span>Make this as my default address</span>
        </label>
      </div>
      <div className="w-full flex gap-2 mt-10">
        <button
          className="border-2 border-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] w-full text-orange-500"
          onClick={() => setShowAddress(false)}
        >
          Cencel
        </button>
        <button className="bg-orange-500 py-2 px-5 text-lg font-semibold rounded-[8px] w-full text-white">
          {address ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default AddAddress;
