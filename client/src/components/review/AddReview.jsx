import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import StarRatingComponent from "react-star-rating-component";
import { useDispatch, useSelector } from "react-redux";
import { addReviews } from "../../services/operations/ProductAPI";
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
    const isReviewed = productDetails.reviews.find(
      (review) => review.user.toString() === user?._id?.toString()
    );
    if (isReviewed) {
      setRating(isReviewed.rating);
      setComment(isReviewed.comment);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addReviews(productId, rating, comment, token, navigate));
    setShowReview(false);
  };

  return (
    <form
      className="w-96 bg-white p-5 rounded-lg text-sm shadow-lg m-5 transition-all ease-in-out transform hover:scale-105"
      onSubmit={submitHandler}
    >
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-bold text-gray-800">
          {updateReview ? "Update Review" : "Add Review"}
        </p>
        <RxCross1
          size={20}
          onClick={() => setShowReview(false)}
          className="mt-1 cursor-pointer text-gray-600 hover:text-red-600 transition-all"
        />
      </div>

      <div className="mb-4">
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={(nextValue) => setRating(nextValue)}
          onStarHover={(nextValue) => setRating(nextValue)}
          className="text-4xl text-yellow-500 hover:text-yellow-400 transition-all"
        />
        <div className="mt-2 text-gray-600">
          {rating > 0 && <span>{rating} out of 5 stars</span>}
        </div>
      </div>

      <div>
        <textarea
          name="Comment"
          className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
          rows={5}
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">
            {comment.length}/500 characters
          </span>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-orange-600 text-white rounded-full px-4 py-2 text-lg font-semibold shadow-md hover:bg-orange-500 transition-all"
        >
          {updateReview ? "Update Review" : "Submit Review"}
        </button>
      </div>
    </form>
  );
};

export default AddReview;
