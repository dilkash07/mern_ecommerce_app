import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import { getUserDetails } from "../services/operations/ProfileAPI";

const Home = () => {
  // const API_URL = "https://fakestoreapi.com/products";
  // const API_URL = "https://dummyjson.com/products"; old hai
  const API_URL = "http://localhost:4000/api/v1/product/getAllProduct";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { query } = useSelector((state) => state.query);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // token verification
  // console.log(token);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetails(token, navigate));
    }
  }, [token]);

  // useEffect(() => {
  //   console.log(query);
  // }, [query]);

  async function fetchProduct() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setItems(data.response);
    } catch (error) {
      console.log("error aa gaya jee");
      toast.error(error.message);
      setItems([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProduct();
  }, [query.length === 0]);

  useEffect(() => {
    const searchItem = items.filter(
      (item) =>
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.brand.toLowerCase().includes(query.toLowerCase())
    );
    setItems(searchItem);
  }, [query]);

  return (
    <div className=" min-h-screen w-screen flex justify-center items-center flex-wrap gap-5 py-5 -z-10">
      {/* <Filter /> */}
      {loading ? (
        // toast.loading("Loading...")
        <Spinner />
      ) : items.length > 0 ? (
        items.map((item) => <Card item={item} key={item._id} />)
      ) : (
        <div>Data Not Found</div>
        // <AddProduct />
      )}
    </div>
  );
};

export default Home;
