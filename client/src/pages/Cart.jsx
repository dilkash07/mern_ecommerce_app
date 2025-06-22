import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/cart/CartItem";
import { Link, useNavigate } from "react-router-dom";
import PriceDetails from "../components/product/PriceDetails";
import { IoIosArrowForward } from "react-icons/io";
import { LiaBookmark } from "react-icons/lia";
import Loader from "../components/core/Loader";
import Header from "../components/core/Header";
import Footer from "../components/core/Footer";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { loading } = useSelector((state) => state.loader);

  return (
    <div className="h-screen w-screen relative">
      <Header />
      {loading && <Loader />}
      <div className="max-w-7xl mx-auto px-5 relative">
        <div className="flex gap-2 items-center border-b border-orange-100 py-4">
          <h1 className="italic text-3xl mb-3">My Cart</h1>
          <p className="border-l border-black pl-2 ml-2">
            <span className="text-gray-600 text-md">
              {cart?.items?.length} Items
            </span>
          </p>
        </div>
        {cart?.items?.length > 0 ? (
          <div className="max-w-7xl flex justify-center gap-10 flex-wrap">
            <div className=" max-h-[545px] overflow-y-scroll scrollbar-none">
              {cart?.items?.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}

              {/* add more from wishlist */}
              {wishlist?.items?.length > 0 && (
                <Link to={"/wishlist"}>
                  <div className="flex justify-between items-center py-3 px-5 border border-orange-100 mt-5 rounded-md font-semibold">
                    <div className="flex gap-2">
                      <LiaBookmark size={25} />
                      Add More From Wishlist
                    </div>
                    <IoIosArrowForward size={25} />
                  </div>
                </Link>
              )}
            </div>

            <div>{<PriceDetails cart={cart} />}</div>
          </div>
        ) : (
          <div className="h-[70vh] flex flex-col justify-center items-center gap-1">
            <p>Your cart is empty!</p>
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

export default Cart;
