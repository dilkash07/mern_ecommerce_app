import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCategoryQuery } from "../../redux/slice/QuerySlice";

const CategorySlider = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query, categoryQuery } = useSelector((state) => state.query);

  const categoryHandler = () => {
    dispatch(setCategoryQuery(item.categoryName));
    navigate("/filteredProduct");
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="h-16 w-16 md:h-24 md:w-24 bg-gray-100 rounded-full flex justify-center items-center p-5 cursor-pointer border"
        onClick={categoryHandler}
      >
        <img
          src={item.categoryImage.image_url}
          alt={`${item.categoryName}`}
          className="max-h-16 hover:scale-125 transition-all"
        />
      </div>
      <p>{item.categoryName}</p>
    </div>
  );
};

export default CategorySlider;
