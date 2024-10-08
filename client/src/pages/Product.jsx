import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import {
  getProductCategory,
  uploadProduct,
} from "../services/operations/AdminAPI";
import AddCategory from "../components/admin/AddCategory";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const { productCategories } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    sellingPrice: "",
    quantity: "1",
    images: [],
    warranty: "",
    returnPolicy: "",
  });

  const [imagesPreview, setImagesPreview] = useState([]);
  const [showCategory, setShowCategory] = useState(false);

  const changeHandler = (event) => {
    if (event.target.value === "addCategory") {
      setShowCategory(true);
    } else {
      setFormData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const imageHandler = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, files[i]],
      }));

      const reader = new FileReader();
      reader.readAsDataURL(files[i]);

      reader.onloadend = () => {
        setImagesPreview((prev) => [...prev, reader.result]);
      };
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    uploadProduct(formData);
  };

  return (
    <div className="h-screen w-screen relative">
      <form
        className="max-h-[90%] w-9/12 mx-auto mt-1 px-10 py-12 bg-orange-200 border rounded-lg overflow-y-scroll grid gap-8"
        onSubmit={submitHandler}
      >
        <label className="w-full">
          <p>
            Title<sup>*</sup>
          </p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter title"
            type="text"
            name="title"
            value={formData.title}
            onChange={changeHandler}
          />
        </label>
        <label className="w-full">
          <p>
            Description<sup>*</sup>
          </p>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            name="description"
            placeholder="Enter description..."
            value={formData.description}
            rows={4}
            onChange={changeHandler}
          ></textarea>
        </label>
        <label className="w-full">
          <p>
            Brand<sup>*</sup>
          </p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter brand"
            type="text"
            name="brand"
            value={formData.brand}
            onChange={changeHandler}
          />
        </label>
        <label className="w-full">
          <p>
            Category<sup>*</sup>
          </p>
          <select
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            name="category"
            value={formData.category}
            onChange={changeHandler}
            onClick={changeHandler}
          >
            <option disabled>Select Category</option>
            {productCategories?.map((item) => (
              <option key={item._id}>{item.categoryName}</option>
            ))}
            <option value={"addCategory"}>Add Category</option>
          </select>
        </label>
        <label className="w-full">
          <p>
            Price<sup>*</sup>
          </p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter price"
            type="number"
            name="price"
            value={formData.price}
            onChange={changeHandler}
          />
        </label>
        <label className="w-full">
          <p>
            Selling Price<sup>*</sup>
          </p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter selling price"
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={changeHandler}
          />
        </label>
        <label className="w-full">
          <p>
            Quantity<sup>*</sup>
          </p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={changeHandler}
          />
        </label>
        <label className="w-full cursor-pointer">
          <p>
            Image<sup>*</sup>
          </p>
          <div className="w-full h-48 border border-gray-500 rounded-md px-4 py-2 flex flex-col justify-center items-center">
            <FaCloudUploadAlt size={80} />
            <p>Upload image</p>
          </div>
          <input
            className="hidden"
            type="file"
            name="images"
            onChange={imageHandler}
            multiple
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {imagesPreview.map((image, key) => (
            <img
              src={image}
              alt="Product review"
              height={80}
              width={80}
              className="rounded-md"
              key={key}
            />
          ))}
        </div>
        <label className="w-full">
          <p>Warranty</p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter warranty"
            type="text"
            name="warranty"
            value={formData.warranty}
            onChange={changeHandler}
          />
        </label>{" "}
        <label className="w-full">
          <p>Return Policy</p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter return policy"
            type="text"
            name="returnPolicy"
            value={formData.return}
            onChange={changeHandler}
          />
        </label>
        <button className="bg-orange-600 rounded-lg px-4 py-2">
          Upload Product
        </button>
      </form>
      {showCategory && (
        <div className="h-screen w-screen grid place-items-center bg-white bg-opacity-50 fixed top-0 right-0">
          <AddCategory setShowCategory={setShowCategory} />
        </div>
      )}
    </div>
  );
};

export default Product;
