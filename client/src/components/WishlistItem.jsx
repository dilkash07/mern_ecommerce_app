import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { setCart, setLoading } from "../redux/slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addCart } from "../services/operations/CartAPI";
import { removeWishlist } from "../services/operations/WishlistAPI";

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state);
  const { user } = useSelector((state) => state.user);

  const userId = user._id;
  const productId = item.product._id;
  const quantity = 1;

  function moveToCart() {
    dispatch(addCart(userId, productId, quantity));
    dispatch(removeWishlist(userId, productId));

    // if item less than 1 and navigate to cart
    if (wishlist?.items?.length <= 1) {
      navigate("/cart");
    }
  }

  function removeItem() {
    dispatch(removeWishlist(userId, productId));
  }

  return (
    <div className="w-72 flex flex-col gap-5 border shadow-md rounded-md p-5 relative">
      <div className="h-8 w-8 rounded-full flex justify-center items-center bg-white bg-opacity-50 absolute top-5 right-5 cursor-pointer">
        <RxCross1 onClick={removeItem} />
      </div>

      <Link to={`/SingleItem/${item.product._id}`}>
        <div className=" w-60 h-64">
          <img
            src={item.product.thumbnail.image_url}
            className="max-h-full  rounded-sm object-cover"
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
          ₹ {item.product.sellingPrice}{" "}
          <span className="text-xs font-normal text-gray-600 line-through">
            MRP.
            {item.product.price}
          </span>{" "}
          <span className="text-xs font-normal text-orange-400">
            ({Math.round(item.product.discount)}% OFF)
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
