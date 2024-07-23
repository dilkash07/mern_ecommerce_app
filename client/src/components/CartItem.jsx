import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { setCart, setLoading } from "../redux/slice/CartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addCart, removeCart } from "../services/operations/CartAPI";
import {
  addWishlist,
  removeWishlist,
} from "../services/operations/WishlistAPI";

const CartItem = ({ item }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userId = user._id;
  const productId = item.product._id;

  function changeHandler(e) {
    const quantity = e.target.value;
    dispatch(addCart(userId, productId, quantity));
  }

  function removeItem() {
    dispatch(removeCart(userId, productId));
  }

  function moveToWishlist() {
    dispatch(removeCart(userId, productId));
    dispatch(addWishlist(userId, productId));
  }

  return (
    <div className=" max-w-3xl flex mt-5 gap-5 border-b-2 border-orange-100 py-5 relative">
      <div className="absolute top-5 right-5">
        <RxCross1 className="cursor-pointer" onClick={removeItem} />
      </div>
      <div className=" w-1/4 flex justify-center mt-5">
        <Link to={`/singleItem/${item.product._id}`}>
          <img src={item.product.thumbnail.image_url} className="max-h-56" />
        </Link>
      </div>
      <div className="w-3/4">
        <p className=" text-lg font-semibold mb-5 mr-10">
          {item.product.title}
        </p>

        {item.product.description.length > 400 ? (
          <p className=" font-normal text-sm text-gray-600">
            {item.product.description.split(" ").slice(0, 40).join(" ") + "..."}
          </p>
        ) : (
          item.product.description
        )}

        <p className="flex items-center gap-2 rounded-sm text-sm font-semibold">
          {item.product.rating}{" "}
          <FaStar size={15} className=" text-orange-300" /> |{" "}
          {item.product.stock}
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
            ({Math.round(item.product.discount)}% OFF)
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
