import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addWishlist,
  removeWishlist,
} from "../services/operations/WishlistAPI";
import { formattedINR } from "../utils.jsx/inrFormatter";

const RecommendedCard = ({ item }) => {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const productId = item?._id;
  const quantity = 1;

  function addToWishlist() {
    dispatch(addWishlist(productId, token));
  }

  function removeFromWishlist() {
    dispatch(removeWishlist(productId, token));
  }

  return (
    <div
      className="p-5 w-56 border rounded-md hover:scale-105 transition duration-300 shadow-md"
      onMouseEnter={() => setShowCart(true)}
      onMouseLeave={() => setShowCart(false)}
    >
      <div className="relative">
        {wishlist?.items?.some((p) => p.product._id == item._id) ? (
          <IoMdHeart
            className="absolute -top-1 -right-1  text-red-600"
            size={25}
            onClick={removeFromWishlist}
          />
        ) : (
          <IoMdHeartEmpty
            className="absolute -top-1 -right-1"
            size={25}
            onClick={addToWishlist}
          />
        )}
        <Link to={`/SingleItem/${item._id}`}>
          <div className="max-w-56 flex justify-center items-center">
            <img
              src={item.thumbnail.image_url}
              className="max-h-full rounded-sm"
            />
          </div>
        </Link>
      </div>
      <div>
        <p className="flex items-center gap-1 bg-white bg-opacity-50 px-0.5 rounded-sm text-sm font-semibold">
          {item.rating.toFixed(1)}
          <FaStar size={15} className=" text-orange-300" /> |{" "}
          {item.numOfReviews}
        </p>
        <p className=" font-bold">
          {item.title.split(" ").slice(0, 2).join(" ")}
        </p>
        <p className=" font-normal text-sm text-gray-600">
          {item.description.length > 60
            ? item.description.split(" ").slice(0, 4).join(" ") + "..."
            : item.description}
        </p>
        <p className="text-sm font-semibold">
          ₹ {formattedINR(item.sellingPrice)}{" "}
          <span className="text-xs font-extralight text-gray-600 line-through">
            ₹ {formattedINR(item.price)}
          </span>{" "}
          <span className="text-xs font-extralight text-orange-400">
            ({Math.round(item.discount)}% OFF)
          </span>
        </p>
      </div>
    </div>
  );
};

export default RecommendedCard;
