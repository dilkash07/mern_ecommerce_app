import React from "react";
import WishlistItem from "../components/wishlist/WishlistItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/core/Loader";
import Footer from "../components/core/Footer";
import Header from "../components/core/Header";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { loading } = useSelector((state) => state.loader);

  return (
    <div className="h-screen w-screen relative">
      <Header />
      {loading && <Loader />}
      <div className=" min-h-screen max-w-7xl mx-auto px-5">
        <div className="flex gap-2 items-center border-b border-orange-100 py-4 mb-5">
          <h1 className="italic text-3xl mb-3">My Wishlist</h1>
          <p className="border-l border-black pl-2 ml-2">
            <span className="text-gray-600 text-xl">
              {wishlist?.items?.length} Items
            </span>
          </p>
        </div>

        {wishlist?.items?.length > 0 ? (
          <div className="flex flex-wrap gap-5 pb-5 justify-center">
            {wishlist?.items?.map((item) => (
              <WishlistItem item={item} key={item.product._id} />
            ))}
          </div>
        ) : (
          <div className="h-[70vh] flex flex-col justify-center items-center gap-1">
            <p>Your wishlist is empty!</p>
            <Link to={"/"}>
              <button className="bg-orange-600 text-white px-5 py-1 rounded-md text-lg">
                Shop Now
              </button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
