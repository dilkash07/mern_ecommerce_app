import React from "react";
import { GoStarFill } from "react-icons/go";
import { MdOutlineStarPurple500 } from "react-icons/md";
import ReviewsChart from "./ReviewsChart";
import { useSelector } from "react-redux";
import { formattedDate } from "../utils.jsx/dateFormatter";

const ReviewsDetails = ({ showReview, setShowReview, updateReview }) => {
  const { productDetails } = useSelector((state) => state.product);

  return (
    <div className="h-fit">
      <p className="text-2xl font-bold my-5">Ratings & Reviews</p>
      <div className="border-b border-gray-300 my-2 flex gap-5 mb-2">
        <div className=" h-28 flex flex-col items-left gap-x-2 border-r pr-10 ">
          <p className="text-6xl font-xs flex items-end">
            {productDetails.rating}{" "}
            <GoStarFill size={30} className="text-orange-300 mb-1" />
          </p>

          <p className=" text-sm leading-5">1.3k Verified Buyers</p>
        </div>
        <div className="w-52 pl-5">
          <ReviewsChart />
        </div>
      </div>
      {!showReview && (
        <div className="pt-5">
          {updateReview ? (
            <button
              className="bg-orange-600 text-white px-3 py-1 rounded-md text-md font-semibold bg"
              onClick={() => setShowReview(true)}
            >
              Update Reviews
            </button>
          ) : (
            <button
              className="bg-orange-600 text-white px-3 py-1 rounded-md text-md font-semibold bg"
              onClick={() => setShowReview(true)}
            >
              Add Reviews
            </button>
          )}
        </div>
      )}
      <div>
        <p className="text-xl font-semibold pt-5">
          Customer Reviews ({productDetails.numOfReviews})
        </p>
        {productDetails?.reviews?.map((review, key) => (
          <div className="border-b flex gap-x-3 py-5" key={key}>
            <p className="w-fit h-fit text-sm rounded-sm flex px-0.5 items-center text-white bg-orange-600">
              {review.rating} <MdOutlineStarPurple500 />
            </p>
            <div>
              <p className="text-md font-normal text-gray-900">
                {review.comment}
              </p>
              <p className="text-sm text-gray-600 mt-3">
                {review.name} | {formattedDate(review.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsDetails;
