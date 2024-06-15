import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { removeWish } from "../redux/slice/WishlistSlice";
import { add } from "../redux/slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state);

  function moveToCart() {
    dispatch(add(item));
    dispatch(removeWish(item._id));
    toast.success("Item moved to cart");

    // if item less than 1 and navigate to cart
    if (wishlist.length <= 1) {
      navigate("/cart");
    }
  }

  function removeItem() {
    dispatch(removeWish(item._id));
    toast.error("Item removed from wishlist");
  }
  return (
    <div className="w-72 flex flex-col gap-5 border shadow-md rounded-md p-5 relative">
      <div className="h-8 w-8 rounded-full flex justify-center items-center bg-white bg-opacity-50 absolute top-5 right-5 cursor-pointer">
        <RxCross1 onClick={removeItem} />
      </div>

      <Link to={`/SingleItem/${item.id}`}>
        <div className=" w-60 h-64">
          <img
            src={item.thumbnail.image_url}
            className="max-h-full  rounded-sm object-cover"
          />
        </div>
      </Link>

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
      <button
        className="border text-sm px-5 py-2 rounded-md font-semibold text-orange-600"
        onClick={moveToCart}
      >
        MOVE TO CART
      </button>
    </div>
  );
};

export default WishlistItem;
