import React from "react";
import { useSelector } from "react-redux";

const ReviewChart = () => {
  const { productDetails } = useSelector((state) => state.product);

  let fiveStar = 0;
  let fourStar = 0;
  let threeStar = 0;
  let twoStar = 0;
  let oneStar = 0;

  productDetails?.reviews?.forEach((review) => {
    if (review.rating == 5) {
      fiveStar += 1;
    }
    if (review.rating == 4) {
      fourStar += 1;
    }
    if (review.rating == 3) {
      threeStar += 1;
    }
    if (review.rating == 2) {
      twoStar += 1;
    }
    if (review.rating == 1) {
      oneStar += 1;
    }
  });

  const calculatePercentage = (obtained, total) => {
    return (obtained / total) * 100;
  };

  const productRating = [
    {
      star: `5★`,
      totalReviews: productDetails.numOfReviews,
      obtainedReviews: fiveStar,
      barStyle: `bg-green-600 h-1`,
      ramainingBarStyle: `bg-gray-300 h-1 w-full`,
    },
    {
      star: `4★`,
      totalReviews: productDetails.numOfReviews,
      obtainedReviews: fourStar,
      barStyle: `bg-green-600 h-1`,
      ramainingBarStyle: `bg-gray-300 h-1 w-full`,
    },
    {
      star: `3★`,
      totalReviews: productDetails.numOfReviews,
      obtainedReviews: threeStar,
      barStyle: `bg-green-500 h-1`,
      ramainingBarStyle: `bg-gray-300 h-1 w-full`,
    },
    {
      star: `2★`,
      totalReviews: productDetails.numOfReviews,
      obtainedReviews: twoStar,
      barStyle: `bg-orange-400 h-1`,
      ramainingBarStyle: `bg-gray-300 h-1 w-full`,
    },
    {
      star: `1★`,
      totalReviews: productDetails.numOfReviews,
      obtainedReviews: oneStar,
      barStyle: `bg-red-500 h-1`,
      ramainingBarStyle: `bg-gray-300 h-1 w-full`,
    },
  ];

  return productRating.map((rating, key) => (
    <div className="w-full" key={key}>
      {/* ratings bar */}
      <div className="flex items-center">
        {/* Obtained ratings */}
        <div className="mr-4 text-sm font-medium w-3">{rating.star}</div>
        <div
          className={rating.barStyle}
          style={{
            width: `${calculatePercentage(
              rating.obtainedReviews,
              rating.totalReviews
            )}%`,
          }}
        ></div>
        {/* Remaining ratings */}
        <div
          className={rating.ramainingBarStyle}
          style={{
            width: `${
              100 -
              calculatePercentage(rating.obtainedReviews, rating.totalReviews)
            }%`,
          }}
        ></div>
        <div className="ml-3 text-sm text-gray-500">
          {rating.obtainedReviews}
        </div>
      </div>
    </div>
  ));
};

export default ReviewChart;
