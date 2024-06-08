import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { removeWish } from "../redux/slice/WishlistSlice";
import { addWish } from "../redux/slice/WishlistSlice";
import { add, remove } from "../redux/slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const SingleItem = () => {
  const { itemId } = useParams();

  const API_URL = `https://dummyjson.com/products/${itemId}`;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { wishlist } = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchProduct() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data);
      console.log("this is data : ", data);
    } catch (error) {
      console.log("error aa gaya jee");
      toast.error(error);
      setItems([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [itemId]);

  function addWishlist() {
    dispatch(addWish(items));
    toast.success("Item add to wishlist");
  }

  function removeWishlist() {
    dispatch(removeWish(items.id));
    toast.error("Item removed from wishlist");
  }

  function addCart() {
    dispatch(add(items));
    toast.success("Item added to cart");
  }

  function moveToCart() {
    navigate("/cart");
  }

  console.log("this is items: ", items);
  return (
    <div NameName="h-screen max-w-7xl">
      {/* <section>
        {items &&
          items.images.map((item) => {
            <div className="flex flex-col">
              <img src={item.image} className="h-16 w-16" />
            </div>;
          })}
      </section> */}
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={items.thumbnail}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div className="mb-4">
                {/* brand */}
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {items.brand}
                </h2>

                {/* title */}
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {items.title}
                </h1>

                {/* description */}
                <p className="text-xl text-gray-600 font-normal">
                  {items.description}
                </p>

                {/* rating */}
                <p className=" w-max flex items-center gap-2 bg-gray-100  py-1 mt-3 rounded-sm text-sm font-semibold border text-gray-950 px-2">
                  {items.rating}{" "}
                  <FaStar size={15} className=" text-orange-300" />
                  <span className=" font-normal border-l-2 pl-2 border-gray-300">
                    {items.stock} Ratings
                  </span>
                </p>
              </div>

              <div>
                <div>
                  <p className="title-font font-medium text-2xl text-black">
                    ₹ {items.price}{" "}
                    <span className="text-xs font-normal text-gray-600 line-through">
                      MRP.
                      {Math.round(
                        items.price +
                          (items.discountPercentage * items.price) / 100
                      )}
                    </span>{" "}
                    <span className="text-xs font-normal text-orange-400">
                      ({items.discountPercentage}% OFF)
                    </span>
                  </p>
                </div>

                {/* add to cart & wishlist */}
                <div className="min-w-max flex gap-3 text-white mt-3 lg:mt-28">
                  {cart.some((p) => p.id == items.id) ? (
                    <button
                      className=" w-1/2 bg-orange-600 font-bold flex gap-2 justify-center items-center py-3 px-3 rounded-md"
                      onClick={moveToCart}
                    >
                      <MdOutlineShoppingCart size={25} /> MOVE TO CART
                    </button>
                  ) : (
                    <button
                      className=" w-1/2 bg-orange-600 font-bold flex gap-2 justify-center items-center py-3 px-3 rounded-md"
                      onClick={addCart}
                    >
                      <MdOutlineShoppingCart size={25} /> ADD TO CART
                    </button>
                  )}

                  {wishlist.some((p) => p.id == items.id) ? (
                    <button
                      className=" w-1/2 font-bold flex gap-2 items-center justify-center border border-gray-300 py-3 px-3 rounded-md text-gray-800"
                      onClick={removeWishlist}
                    >
                      <IoMdHeart size={20} className="text-red-600" /> WISHLIST
                    </button>
                  ) : (
                    <button
                      className=" w-1/2 font-bold flex gap-2 items-center justify-center border border-gray-300 py-3 px-3 rounded-md text-gray-800"
                      onClick={addWishlist}
                    >
                      <IoMdHeartEmpty size={20} /> WISHLIST
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleItem;
