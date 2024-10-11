import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdEditNote } from "react-icons/md";
import { formattedINR } from "../../utils.jsx/inrFormatter";
import { setProduct } from "../../redux/slice/AdminSlice";

const ListItem = ({ setUpdateProduct }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.admin);

  const updateProductHandler = (item) => {
    dispatch(setProduct(item));
    setUpdateProduct(true);
  };

  return (
    <div>
      <div className="border-b border-orange-100 py-4 mb-10">
        <h1 className="italic text-3xl mb-3">All Items List</h1>
      </div>

      <div className="w-full">
        <div className="className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border rounded-sm bg-gray-100 text-sm font-bold gap-x-4">
          <p className="w-20">Image</p>
          <p className="max-w-60">Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Stock</p>
          <p className="text-center">Actions</p>
        </div>
        {products?.map((item) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border rounded-md text-sm my-2"
            key={item._id}
          >
            <div className="h-20 w-20 flex justify-center items-center">
              <img
                src={item.thumbnail.image_url}
                alt={item.brand}
                className="max-w-16 max-h-16"
              />
            </div>
            <p className="max-w-60 text-left">
              {item.title.split(" ").slice(0, 10).join(" ") + "..."}
            </p>
            <p>{item.category}</p>
            <p>₹ {formattedINR(item.sellingPrice)}</p>
            <p>{item.stock}</p>
            <p className="grid place-items-center">
              <MdEditNote
                size={25}
                onClick={() => updateProductHandler(item)}
                className="cursor-pointer"
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItem;
