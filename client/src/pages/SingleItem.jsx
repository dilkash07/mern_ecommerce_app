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
import ReactImageMagnify from "react-image-magnify";
import imag300 from "../assets/300.png";
import imag1200 from "../assets/1200.png";

const SingleItem = () => {
  // const { itemId } = useParams();

  const API_URL =
    "http://localhost:4000/api/v1/product/getSingleProduct/66651c389611987c36297f5f";
  // const API_URL = `https://dummyjson.com/products/${itemId}`;

  const [items, setItems] = useState([]);
  const [activeImage, setActiveImage] = useState("");
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
      setItems(data?.response);
      setActiveImage(data?.response?.thumbnail?.image_url);
      console.log("this is data 1 : ", data?.response);
      console.log("this is data 2 : ", data.response);
    } catch (error) {
      console.log("error aa gaya jee");
      toast.error(error);
      setItems([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, []);
  // useEffect(() => {
  //   fetchProduct();
  // }, [itemId]);

  const setImageHandler = (e) => {
    setActiveImage(e.target.src);
  };

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
    <div className="min-h-screen max-w-7xl p-2 md:py-5 md:px-10  flex flex-col md:flex-row mx-auto">
      <div className="md:min-w-[450px] flex items-center md:items-start flex-col-reverse md:flex-row mt-4 ">
        <div className="flex md:h-[400px] pt-4 gap-2 md:flex-col  items-center overflow-scroll scrollbar-none ">
          {items?.images?.map((image, key) => (
            <img
              src={image?.image_url}
              height={80}
              width={80}
              className="hover:border-2 border-orange-600"
              key={key}
              onClick={setImageHandler}
              onMouseMove={setImageHandler}
            />
          ))}
        </div>
        <div className="mx-auto md:px-5">
          <img
            src={activeImage}
            alt="ecommerce"
            height={400}
            width={400}
            className="md:h-[400px] md:w-[400px] object-cover"
          />

          {/* <ReactImageMagnify
            className=" object-cover"
            {...{
              smallImage: {
                alt: "Wristwatch by Ted Baker London",
                isFluidWidth: true,
                src: activeImage,
              },
              largeImage: {
                src: activeImage,
                width: 1500,
                height: 1800,
              },

              enlargedImageContainerDimensions: {
                width: "150%",
                height: "120%",
              },
            }}
          /> */}
        </div>
      </div>
      <div className="min-w-[312px] md:max-w-[640px] mt-12">
        <div className="mb-4">
          {/* brand */}
          <h2 className="text-sm title-font text-gray-500 tracking-widest">
            {items?.brand}
          </h2>

          {/* title */}
          <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
            {items?.title}
          </h1>

          {/* description */}
          <p className="text-xl text-gray-600 font-normal">
            {items?.description}
          </p>

          {/* rating */}
          <p className=" w-max flex items-center gap-2 bg-gray-100  py-1 mt-3 rounded-sm text-sm font-semibold border text-gray-950 px-2">
            {items?.review?.length}{" "}
            <FaStar size={15} className=" text-orange-300" />
            <span className=" font-normal border-l-2 pl-2 border-gray-300">
              {items?.rating} Ratings
            </span>
          </p>
        </div>

        <div>
          <div>
            <p className="title-font font-medium text-2xl text-black">
              ₹ {items.sellingPrice}{" "}
              <span className="text-xs font-normal text-gray-600 line-through">
                MRP.
                {items?.price}
              </span>{" "}
              <span className="text-xs font-normal text-orange-400">
                ({Math.round(items?.discount)}% OFF)
              </span>
            </p>
          </div>

          {/* add to cart & wishlist */}
          <div className="min-w-max flex gap-3 px-1 text-white mt-7 md:mt-24">
            {cart.some((p) => p.id == items.id) ? (
              <button
                className="w-1/2 bg-orange-600 font-bold flex gap-1 md:gap-2 justify-center border border-gray-300 items-center py-3 rounded-md"
                onClick={moveToCart}
              >
                <MdOutlineShoppingCart size={25} /> Move to Cart
              </button>
            ) : (
              <button
                className="w-1/2 bg-orange-600 text-sm font-bold flex gap-1 md:gap-2 justify-center border border-gray-300 items-center py-3 rounded-md"
                onClick={addCart}
              >
                <MdOutlineShoppingCart size={25} /> Add to Cart
              </button>
            )}

            {wishlist.some((p) => p.id == items.id) ? (
              <button
                className=" w-1/2 font-bold flex gap-1 md:gap-2 items-center justify-center border border-gray-300 py-3 rounded-md text-gray-800"
                onClick={removeWishlist}
              >
                <IoMdHeart size={20} className="text-red-600" /> Wishlist
              </button>
            ) : (
              <button
                className=" w-1/2 font-bold flex gap-1 md:gap-2 items-center justify-center border border-gray-300 py-3 rounded-md text-gray-800"
                onClick={addWishlist}
              >
                <IoMdHeartEmpty size={20} /> Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
};

export default SingleItem;
