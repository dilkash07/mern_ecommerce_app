import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { uploadProductCategory } from "../../services/operations/AdminAPI";

const AddCategory = ({ setShowCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const dispatch = useDispatch();

  const removeCategoryHandler = () => {
    setShowCategory(false);
  };

  const categoryNameHandler = (event) => {
    setCategoryName(event.target.value);
  };

  const imageHandler = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(uploadProductCategory(categoryName, categoryImage));
  };

  return (
    <form
      className="w-80 bg-orange-200 p-3 rounded-lg text-sm m-5"
      onSubmit={submitHandler}
    >
      <div className="flex justify-between">
        <p className="text-md font-bold">Add Category</p>
        <RxCross1
          size={18}
          onClick={removeCategoryHandler}
          className="cursor-pointer"
        />
      </div>
      <div>
        <label className="w-full">
          <p className="mt-1">
            Category Name<sup className="text-red-600">*</sup>
          </p>
          <input
            type="text"
            className="w-full px-4 py-1 rounded-md"
            placeholder="Enter category"
            name="category"
            value={categoryName}
            onChange={categoryNameHandler}
          />
        </label>
        <label className="w-full cursor-pointer">
          <p className="mt-2">
            Category Image<sup className="text-red-600">*</sup>
          </p>
          <div className="w-full border border-gray-500 rounded-md px-4 py-2 flex flex-col justify-center items-center">
            <FaCloudUploadAlt size={60} />
            <p>Upload image</p>
          </div>
          <input
            className="hidden"
            type="file"
            name="images"
            onChange={imageHandler}
          />
        </label>
      </div>
      <div className="flex justify-end mt-2">
        <button className="bg-orange-600 text-white rounded-full px-2 py-1">
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
