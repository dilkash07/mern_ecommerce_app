import React from "react";
import WishlistItem from "../components/WishlistItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state);
  console.log(wishlist);

  return (
    <div className=" min-h-screen max-w-7xl mx-auto">
      <div className="flex gap-2 items-center p-5">
        <h1 className="italic text-3xl mb-3">My Wishlist</h1>
        <p className="border-l border-black pl-2 ml-2">
          <span className="text-gray-600 text-xl">{wishlist.length} Items</span>
        </p>
      </div>

      {wishlist.length > 0 ? (
        <div className="flex flex-wrap gap-5 pb-5 justify-center">
          {wishlist.map((item) => (
            <WishlistItem item={item} key={item.id} />
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
  );
};

export default Wishlist;
