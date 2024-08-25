import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { setCart, setLoading } from "../redux/slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addCart, moveToCart } from "../services/operations/CartAPI";
import { removeWishlist } from "../services/operations/WishlistAPI";
import { formattedINR } from "../utils.jsx/inrFormatter";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state);
  const { token } = useSelector((state) => state.auth);

  const productId = item.product._id;

  function moveCart() {
    // dispatch(addCart(productId, quantity, token));
    // dispatch(removeWishlist(productId, token));

    // // if item less than 1 and navigate to cart
    // if (wishlist?.items?.length <= 1) {
    //   navigate("/cart");
    // }

    dispatch(moveToCart(productId, 1, token, navigate));
  }

  function removeItem() {
    dispatch(removeWishlist(productId, token));
  }

  return (
    <div className="w-72 flex flex-col gap-5 border shadow-md rounded-md p-5 relative">
      <div className="h-8 w-8 rounded-full flex justify-center items-center bg-white bg-opacity-50 absolute top-5 right-5 cursor-pointer">
        <RxCross1 onClick={removeItem} />
      </div>

      <Link to={`/SingleItem/${item.product._id}`}>
        <div className="w-60 h-60 flex justify-center items-center">
          <img
            src={item.product.thumbnail.image_url}
            className="max-h-full rounded-sm"
          />
        </div>
      </Link>

      <div>
        <p className=" font-bold">
          {item.product.title.split(" ").slice(0, 2).join(" ")}
        </p>
        <p className=" font-normal text-sm text-gray-600">
          {item.product.description.length > 60
            ? item.product.description.split(" ").slice(0, 7).join(" ") + "..."
            : item.product.description}
        </p>
        <p className="text-sm font-semibold">
          ₹ {formattedINR(item.product.sellingPrice)}{" "}
          <span className="text-xs font-normal text-gray-600 line-through">
            MRP.
            {formattedINR(item.product.price)}
          </span>{" "}
          <span className="text-xs font-normal text-orange-400">
            ({Math.round(item.product.discount)}% OFF)
          </span>
        </p>
      </div>
      <button
        className="border text-sm px-5 py-2 rounded-md font-semibold text-orange-600"
        onClick={moveCart}
      >
        MOVE TO CART
      </button>
    </div>
  );
};

export default WishlistItem;
