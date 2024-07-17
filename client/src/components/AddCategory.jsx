import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProductCategory } from "../services/operations/ProductAPI";

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
    dispatch(addProductCategory(categoryName, categoryImage));
  };

  return (
    <form
      className="w-80 bg-green-300 p-5 rounded-lg text-sm"
      onSubmit={submitHandler}
    >
      <div className="flex justify-between">
        <p className="text-md font-bold">Add Category</p>
        <RxCross1 onClick={removeCategoryHandler} />
      </div>
      <div>
        <label className="w-full">
          <p>
            Category Name<sup>*</sup>
          </p>
          <input
            type="text"
            className="w-full px-4 py-1 rounded-md"
            placeholder="enter category"
            name="category"
            value={categoryName}
            onChange={categoryNameHandler}
          />
        </label>
        <label className="w-full cursor-pointer">
          <p>
            Category Image<sup>*</sup>
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
      <div className="flex justify-end">
        <button className="bg-red-400 rounded-full px-2 py-1">
          Add Category
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
