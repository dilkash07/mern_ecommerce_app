import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import StarRatingComponent from "react-star-rating-component";
import { useDispatch, useSelector } from "react-redux";
import { addReviews } from "../services/operations/ProductAPI";
import { useNavigate } from "react-router-dom";

const AddReview = ({ setShowReview, productId, updateReview }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const { productDetails } = useSelector((state) => state.product);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const isReviewd = productDetails.reviews.find(
      (review) => review.user.toString() === user?._id?.toString()
    );
    if (isReviewd) {
      setRating(isReviewd.rating);
      setComment(isReviewd.comment);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addReviews(productId, rating, comment, token, navigate));
    setShowReview(false);
  };
  return (
    <form
      className="w-80 bg-orange-200 p-3 rounded-lg text-sm m-5"
      onSubmit={submitHandler}
    >
      <div className="flex justify-between ">
        {updateReview ? (
          <p className="text-md font-bold">Update Review</p>
        ) : (
          <p className="text-md font-bold">Add Review</p>
        )}
        <RxCross1
          size={18}
          onClick={() => setShowReview(false)}
          className="mt-1 cursor-pointer"
        />
      </div>
      <div>
        <div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={(nextValue) => setRating(nextValue)}
            onStarHover={(nextValue) => setRating(nextValue)}
            className=" text-5xl"
          />
        </div>
        <div>
          <textarea
            name="Comment"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            rows={4}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Write your review here..."
          ></textarea>
        </div>
      </div>
      <div className="flex justify-end mt-2">
        {updateReview ? (
          <button className="bg-orange-600 text-white rounded-full px-2 py-1">
            Update Review
          </button>
        ) : (
          <button className="bg-orange-600 text-white rounded-full px-2 py-1">
            Submit Review
          </button>
        )}
      </div>
    </form>
  );
};

export default AddReview;
