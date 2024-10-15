import React, { useEffect } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFilteredProduct } from "../services/operations/ProductAPI";
import CategorySlider from "../components/CategorySlider";
import BannerSlider from "../components/BannerSlider";
import Header from "../components/core/Header";
import Footer from "../components/core/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query } = useSelector((state) => state.query);
  const { product, productCategories } = useSelector((state) => state.product);
  const { loading } = useSelector((state) => state.loader);

  useEffect(() => {
    if (query) {
      dispatch(getFilteredProduct(query, navigate));
    }
  }, [query]);

  return (
    <div className="min-h-screen w-screen relative">
      <Header />
      {loading && <Loader />}
      <div>
        <div className="w-full flex justify-between overflow-x-scroll scrollbar-none gap-5 mt-5 px-10">
          {productCategories?.map((item) => (
            <CategorySlider item={item} key={item._id} />
          ))}
        </div>
        <div>
          <BannerSlider />
        </div>
        <div className=" w-full flex justify-center items-center flex-wrap gap-5 py-5 -z-10">
          {product.length > 0 ? (
            product.map((item) => <Card item={item} key={item._id} />)
          ) : (
            <div>Data Not Found</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
