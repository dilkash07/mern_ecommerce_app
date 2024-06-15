import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/slice/CartSlice";
import { addWish, removeWish } from "../redux/slice/WishlistSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state);
  const { wishlist } = useSelector((state) => state);
  const [addCart, setAddCart] = useState(false);

  console.log("this is item: ", item);
  console.log("this is item id: ", item._id);

  function addToCart() {
    dispatch(add(item));
    toast.success("Item added to cart");
  }

  function removeFromCart() {
    dispatch(remove(item._id));
    toast.error("Item removed from cart");
  }

  function addWishlist() {
    dispatch(addWish(item));
    toast.success("Item add to wishlist");
  }

  function removeWishlist() {
    dispatch(removeWish(item._id));
    toast.error("Item removed from wishlist");
  }

  return (
    <div
      className="p-5 w-72 border rounded-md hover:scale-105 transition duration-300 shadow-md"
      onMouseEnter={() => setAddCart(true)}
      onMouseLeave={() => setAddCart(false)}
    >
      <div className="relative">
        {wishlist.some((p) => p._id == item._id) ? (
          <IoMdHeart
            className="absolute top-3 right-3  text-red-600"
            size={25}
            onClick={removeWishlist}
          />
        ) : (
          <IoMdHeartEmpty
            className="absolute top-3 right-3"
            size={25}
            onClick={addWishlist}
          />
        )}
        <Link to={`/SingleItem/${item._id}`}>
          <div className=" w-60 h-60 flex justify-center items-center">
            <img
              src={item.thumbnail.image_url}
              className="max-h-full rounded-sm"
            />
          </div>
        </Link>
        <p className="flex items-center gap-1 bg-white bg-opacity-50 absolute bottom-1 left-0 px-0.5 rounded-sm text-sm font-semibold">
          {item.rating.toFixed(1)}
          <FaStar size={15} className=" text-orange-300" /> | {item.stock}
        </p>
      </div>
      <div>
        <p className=" font-bold">
          {item.title.split(" ").slice(0, 2).join(" ")}
        </p>
        <p className=" font-normal text-sm text-gray-600">
          {item.description.length > 60
            ? item.description.split(" ").slice(0, 7).join(" ") + "..."
            : item.description}
        </p>
        <p className="text-sm font-semibold">
          ₹ {item.sellingPrice}{" "}
          <span className="text-xs font-normal text-gray-600 line-through">
            MRP.
            {item.price}
          </span>{" "}
          <span className="text-xs font-normal text-orange-400">
            ({Math.round(item.discount)}% OFF)
          </span>
        </p>
      </div>

      {/* <div className="hidden md:block">
        {addCart &&
          (cart.some((p) => p.id == item.id) ? (
            <button
              className="w-full bg-red-600 rounded-md py-1 px-2 mt-1"
              onClick={removeFromCart}
            >
              Remove Item
            </button>
          ) : (
            <button
              className="w-full bg-green-600 rounded-md py-1 px-2 mt-1"
              onClick={addToCart}
            >
              Add To Cart
            </button>
          ))}
      </div> */}
    </div>
  );
};

export default Card;
