import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import AddCategory from "./AddCategory";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { updateProduct } from "../../services/operations/AdminAPI";

const UpdateProduct = ({ setUpdateProduct }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const { product, categories } = useSelector((state) => state.admin);

  const imageHandler = (event) => {
    const files = event.target.files;
    const newImages = getValues("images") || [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);

      reader.onloadend = () => {
        setImagesPreview((prev) => [...prev, reader.result]);
      };

      newImages.push(files[i]);
    }

    setValue("images", newImages);
  };

  const deleteProductImageHandler = (key) => {
    const currentImages = getValues("images") || [];
    const newImages = [...currentImages];
    const newImagesPreview = [...imagesPreview];

    newImages.splice(key, 1);
    newImagesPreview.splice(key, 1);

    setValue("images", newImages);
    setImagesPreview(newImagesPreview);
  };

  const submitHandler = (data) => {
    dispatch(updateProduct(data, product._id));
  };

  return (
    <div className="h-screen w-full overflow-scroll scrollbar-none mx-auto pb-20 px-5 bg-white">
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">Update Item</h1>
      </div>

      <form
        className="px-10 py-12 border rounded-lg grid gap-8"
        onSubmit={handleSubmit(submitHandler)}
      >
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
            multiple
            accept="image/*"
            onChange={imageHandler}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {imagesPreview.length > 0
            ? imagesPreview.map((image, key) => (
                <div
                  className="h-20 w-20 grid place-items-center relative group"
                  key={key}
                >
                  <img
                    src={image}
                    alt="Product review"
                    className="rounded-md max-h-20 max-w-20"
                    key={key}
                  />
                  <RxCross2
                    size={20}
                    className="absolute right-0.5 top-0.5 hidden group-hover:block bg-white bg-opacity-50 rounded-full p-0.5 cursor-pointer"
                    onClick={() => deleteProductImageHandler(key)}
                  />
                </div>
              ))
            : product?.images.map((image, key) => (
                <div
                  className="h-20 w-20 grid place-items-center relative group"
                  key={key}
                >
                  <img
                    src={image.image_url}
                    alt="Product review"
                    className="rounded-md max-h-20 max-w-20"
                    key={key}
                  />
                </div>
              ))}
        </div>
        <label className="w-full">
          <p>
            Title<sup>*</sup>
          </p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter title"
            type="text"
            name="title"
            defaultValue={product?.title}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="-mt-1 text-[12px] text-red-600">
              title is required.
            </span>
          )}
        </label>
        <label className="w-full">
          <p>
            Description<sup>*</sup>
          </p>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            name="description"
            placeholder="Enter description..."
            rows={4}
            defaultValue={product?.description}
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <span className="-mt-1 text-[12px] text-red-600">
              description is required.
            </span>
          )}
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
            defaultValue={product?.brand}
            {...register("brand", { required: true })}
          />
          {errors.brand && (
            <span className="-mt-1 text-[12px] text-red-600">
              brand is required.
            </span>
          )}
        </label>
        <label className="w-full">
          <p>
            Category<sup>*</sup>
          </p>
          <select
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            name="category"
            {...register("category", { required: true })}
            defaultValue={product?.category}
          >
            <option disabled>Select Category</option>
            {categories?.map((item) => (
              <option key={item._id} value={item.categoryName}>
                {item.categoryName}
              </option>
            ))}
            <option value={"addCategory"}>Add Category</option>
          </select>
          {errors.category && (
            <span className="-mt-1 text-[12px] text-red-600">
              category is required.
            </span>
          )}
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
            defaultValue={product?.price}
            {...register("price", { required: true })}
          />
          {errors.price && (
            <span className="-mt-1 text-[12px] text-red-600">
              price is required.
            </span>
          )}
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
            defaultValue={product?.sellingPrice}
            {...register("sellingPrice", { required: true })}
          />
          {errors.sellingPrice && (
            <span className="-mt-1 text-[12px] text-red-600">
              selling price is required.
            </span>
          )}
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
            defaultValue={product?.stock}
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <span className="-mt-1 text-[12px] text-red-600">
              quantity is required.
            </span>
          )}
        </label>
        <label className="w-full">
          <p>Warranty</p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter warranty"
            type="text"
            name="warranty"
            defaultValue={product?.warrantyInformation}
            {...register("warranty", { required: true })}
          />
          {errors.warranty && (
            <span className="-mt-1 text-[12px] text-red-600">
              warranty is required.
            </span>
          )}
        </label>
        <label className="w-full">
          <p>Return Policy</p>
          <input
            className="w-full px-3 py-2 text-gray-700 border border-gray-500 rounded-lg focus:outline-none"
            placeholder="Enter return policy"
            type="text"
            name="returnPolicy"
            id="returnPolicy"
            {...register("returnPolicy", { required: true })}
            defaultValue={product?.returnPolicy}
          />
          {errors.returnPolicy && (
            <span className="-mt-1 text-[12px] text-red-600">
              return policy is required.
            </span>
          )}
        </label>
        <button className="bg-orange-500 text-white rounded-lg px-4 py-2">
          Update Product
        </button>
        <button
          className="text-orange-500 border border-orange-500 rounded-lg px-4 py-2"
          onClick={() => setUpdateProduct(false)}
        >
          Cancel
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

export default UpdateProduct;
