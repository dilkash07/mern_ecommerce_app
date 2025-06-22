import React from "react";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/product/ProductCard";
import { useSelector } from "react-redux";
import Header from "../../components/core/Header";
import Footer from "../../components/core/Footer";

const FilterProduct = () => {
  const { filteredProduct } = useSelector((state) => state.product);
  const { loading } = useSelector((state) => state.loader);
  return (
    <div>
      {" "}
      <Header />
      <div className="h-screen w-screen gap-x-5 flex">
        <div className="h-full w-2/12">
          <Filter />
        </div>
        <div className="h-full w-10/12 p-5 overflow-y-scroll scrollbar-none">
          <p className="text-lg font-semibold mb-5">
            Search Result: {filteredProduct?.length} Items
          </p>
          {loading ? (
            <div className="h-5/6 grid place-items-center">
              <div className="loader"></div>
            </div>
          ) : filteredProduct.length > 0 ? (
            <div className="flex flex-wrap items-start gap-5">
              {filteredProduct.map((item) => (
                <ProductCard item={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className="h-5/6 grid place-items-center">
              Product Not Found
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FilterProduct;
