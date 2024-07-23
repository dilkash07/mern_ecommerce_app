import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { addCart } from "../services/operations/CartAPI";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../services/operations/ProductAPI";
import Card from "../components/Card";
import AddReview from "../components/AddReview";
import ReviewsDetails from "../components/ReviewsDetails";
// import ReactImageMagnify from "react-image-magnify"; isko use karne ke liye packege download karna hoga!
import ImageMagnify from "../components/ImageMagnify";
import ReactImageMagnify from "react-image-magnify";

const SingleItem = () => {
  const { itemId } = useParams();
  const API_URL = `http://localhost:4000/api/v1/product/getProductDetails/${itemId}`;
  const [activeImage, setActiveImage] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [updateReview, setUpdateReview] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { productDetails, recommendedProduct, loading } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isReviewd = productDetails?.reviews?.find(
      (review) => review.user.toString() === user?._id?.toString()
    );
    if (isReviewd) {
      setUpdateReview(true);
    }
  }, [productDetails]);

  useEffect(() => {
    dispatch(getProductDetails(API_URL, itemId));
  }, [itemId]);

  useEffect(() => {
    setActiveImage(productDetails?.thumbnail?.image_url);
  }, [productDetails, recommendedProduct]);

  const setImageHandler = (e) => {
    setActiveImage(e.target.src);
  };

  const userId = user?._id;
  const productId = itemId;
  const quantity = 1;

  function buyNow() {
    console.log("Buy Now");
  }

  function addToCart() {
    dispatch(addCart(userId, productId, quantity));
  }

  function moveToCart() {
    navigate("/cart");
  }

  return (
    <div className="w-screen min-h-screen relative">
      {showReview && (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 right-0 bg-white bg-opacity-50">
          <AddReview
            setShowReview={setShowReview}
            productId={itemId}
            updateReview={updateReview}
            setUpdateReview={setUpdateReview}
          />
        </div>
      )}
      <div className="max-w-7xl p-2 md:py-5 md:px-10  flex flex-col md:flex-row mx-auto">
        <div className="md:min-w-[450px] flex items-center md:items-start flex-col-reverse md:flex-row mt-4 ">
          <div className="flex w-20 h-20 md:h-96 pt-4 gap-2 md:flex-col  items-center overflow-scroll scrollbar-none ">
            {productDetails?.images?.map((image, key) => (
              <div
                className="h-20 w-20 hover:border-2 border-orange-600 flex justify-center items-center"
                key={key}
              >
                <img
                  src={image?.image_url}
                  className="max-h-full"
                  onClick={setImageHandler}
                  onMouseMove={setImageHandler}
                />
              </div>
            ))}
          </div>
          <div className="mx-auto md:px-5">
            <div className="h-96 w-96 flex justify-center items-center">
              <img src={activeImage} alt="ecommerce" className="max-h-full" />
            </div>

            {/* <ImageMagnify imageSrc={activeImage} imageAlt={"ecommerce"} /> */}

            {/* <div className="h-96 flex justify-center items-center">
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Product Image",
                    isFluidWidth: true,
                    src: activeImage,
                  },
                  largeImage: {
                    src: activeImage,
                    width: 1200,
                    height: 1200,
                  },
                  lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                }}
                style={{ borderRadius: "0.5rem", overflow: "hidden" }}
              />
            </div> */}
          </div>
        </div>
        <div className="min-w-[312px] md:max-w-[640px] mt-12">
          <div className="mb-4">
            {/* brand */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {productDetails?.brand}
            </h2>

            {/* title */}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {productDetails?.title}
            </h1>

            {/* rating */}
            <p className=" w-max flex items-center gap-2 bg-gray-100  py-1 mt-3 rounded-sm text-sm font-semibold border text-gray-950 px-2">
              {productDetails?.rating}{" "}
              <FaStar size={15} className=" text-orange-300" />
              <span className=" font-normal border-l-2 pl-2 border-gray-300">
                {productDetails?.numOfReviews} Ratings
              </span>
            </p>
          </div>

          <div>
            <div>
              <p className="title-font font-medium text-2xl text-black">
                ₹ {productDetails.sellingPrice}{" "}
                <span className="text-xs font-normal text-gray-600 line-through">
                  MRP.
                  {productDetails?.price}
                </span>{" "}
                <span className="text-xs font-normal text-orange-400">
                  ({Math.round(productDetails?.discount)}% OFF)
                </span>
              </p>
              {/* description */}
              <p className="text-sm text-gray-600 font-normal">
                {productDetails?.description}
              </p>
            </div>

            {/* add to cart & wishlist */}
            <div className="min-w-max flex gap-3 text-white my-5">
              {cart?.items?.some((p) => p.product._id == itemId) ? (
                <button
                  className="w-1/2 bg-orange-600 font-bold flex gap-1 md:gap-2 justify-center border border-gray-300 items-center py-3 rounded-md"
                  onClick={moveToCart}
                >
                  <MdOutlineShoppingCart size={25} /> Move to Cart
                </button>
              ) : (
                <button
                  className="w-1/2 bg-orange-600 text-sm font-bold flex gap-1 md:gap-2 justify-center border border-gray-300 items-center py-3 rounded-md"
                  onClick={addToCart}
                >
                  <MdOutlineShoppingCart size={25} /> Add to Cart
                </button>
              )}

              <button
                className=" w-1/2 min-w-fit font-bold flex gap-1 md:gap-2 items-center justify-center border border-gray-300 py-3 rounded-md text-gray-800"
                onClick={buyNow}
              >
                <BsFillLightningChargeFill size={20} className="text-red-600" />{" "}
                Buy Now
              </button>
            </div>

            <div className="mt-10">
              <p>{productDetails?.warrantyInformation}</p>
              <p>{productDetails?.returnPolicy}</p>
            </div>
            <div className="flex flex-col">
              <ReviewsDetails
                showReview={showReview}
                setShowReview={setShowReview}
                updateReview={updateReview}
              />
            </div>
          </div>
        </div>
      </div>

      {/* recommendedProduct */}
      {recommendedProduct?.length > 0 && (
        <div className="max-w-7xl mx-auto mt-10">
          <p className="font font-bold text-xl">Recommended Product</p>
          <div className="w-full flex gap-5 py-5 overflow-x-scroll scrollbar-none">
            {recommendedProduct?.map((item) => (
              <Card item={item} key={item._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleItem;
