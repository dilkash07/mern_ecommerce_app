import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { cartQty, remove } from "../redux/slice/CartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addWish } from "../redux/slice/WishlistSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  function changeHandler(e) {
    dispatch(cartQty({ id: item._id, qty: e.target.value }));
  }

  function removeItem() {
    dispatch(remove(item._id));
    toast.error("Item removed from cart");
  }

  function moveToWishlist() {
    dispatch(addWish(item));
    dispatch(remove(item._id));
    toast.error("Item moved to wishlist");
  }

  return (
    <div className=" max-w-3xl flex mt-5 gap-5 border-b-2 border-orange-100 py-5 relative">
      <RxCross1
        className="absolute top-5 right-5 cursor-pointer"
        onClick={removeItem}
      />
      <div>
        <Link to={`/singleItem/${item._id}`}>
          <img src={item.thumbnail.image_url} height={400} width={300} />
        </Link>
      </div>
      <div>
        <p className=" text-lg font-semibold mb-5">{item.title}</p>
        <p className=" font-normal text-sm text-gray-600">{item.description}</p>
        <p className="flex items-center gap-2 rounded-sm text-sm font-semibold">
          {item.rating} <FaStar size={15} className=" text-orange-300" /> |{" "}
          {item.stock}
        </p>
        <div className="flex px-3 py-1 border border-orange-100 w-min my-2">
          <p>Qty</p>
          <select
            className="outline-none"
            name="qty"
            onChange={changeHandler}
            value={item.quantity}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <p className="text-xl font-semibold">
          Rs. {item.sellingPrice}{" "}
          <span className="text-xs font-normal text-gray-600 line-through">
            Rs.
            {item.price}
          </span>{" "}
          <span className="text-xs font-normal text-orange-400">
            ({Math.round(item.discount)}% OFF)
          </span>
        </p>
        <button
          className="text-orange-600 underline hover:text-gray-800 cursor-pointer"
          onClick={moveToWishlist}
        >
          Move to Wishlist
        </button>
      </div>
    </div>
  );
};

export default CartItem;
