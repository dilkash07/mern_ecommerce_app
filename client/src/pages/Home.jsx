import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import { getUserDetails } from "../services/operations/ProfileAPI";
import {
  getAllProduct,
  getFilteredProduct,
} from "../services/operations/ProductAPI";
import { getWishlistDetails } from "../services/operations/WishlistAPI";
import { getCartDetails } from "../services/operations/CartAPI";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading } = useSelector((state) => state.product);
  const { query } = useSelector((state) => state.query);
  const { token } = useSelector((state) => state.auth);

  // token verification
  // console.log(token);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token, navigate));
      dispatch(getCartDetails(token));
      dispatch(getWishlistDetails(token));
    }
  }, [token]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [product === 0]);

  const category = "";
  const brand = "";
  const minPrice = "";
  const maxPrice = "";
  const minDiscount = "";
  const minRating = "";
  const sortOrder = "";

  useEffect(() => {
    if (query) {
      dispatch(
        getFilteredProduct(
          query,
          category,
          brand,
          minPrice,
          maxPrice,
          minDiscount,
          minRating,
          sortOrder,
          navigate
        )
      );
    }
  }, [query]);

  // // searchh functionality old model only frontend to frontend
  // useEffect(() => {
  //   const searchItem = items.filter(
  //     (item) =>
  //       item.category.toLowerCase().includes(query.toLowerCase()) ||
  //       item.title.toLowerCase().includes(query.toLowerCase()) ||
  //       item.description.toLowerCase().includes(query.toLowerCase()) ||
  //       item.brand.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setItems(searchItem);
  // }, [query]);

  return (
    <div className=" min-h-screen w-screen flex justify-center items-center flex-wrap gap-5 py-5 -z-10">
      {/* <Filter /> */}
      {loading ? (
        <Spinner />
      ) : product.length > 0 ? (
        product.map((item) => <Card item={item} key={item._id} />)
      ) : (
        <div>Data Not Found</div>
      )}
    </div>
  );
};

export default Home;
