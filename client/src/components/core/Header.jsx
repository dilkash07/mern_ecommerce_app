import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { setQuery } from "../../redux/slice/QuerySlice";
import loginImg from "../../assets/user_image.png";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import User from "../User";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [Search, setSearch] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useSelector((state) => state.query);
  const { user } = useSelector((state) => state.user);

  function changeHandler(e) {
    dispatch(setQuery(e.target.value));
    navigate("/filteredProduct");
  }

  function queryHandler() {
    dispatch(setQuery(""));
    setSearch(false);
  }

  const [userProfile, setUserProfile] = useState(false);
  const [profile, setProfile] = useState(false);

  return (
    <header className="w-screen relative shadow-md">
      <div className=" w-full bg-orange-200 md:px-16 px-4">
        <div className="max-w-7xl flex py-2 justify-between items-center flex-wrap mx-auto">
          <div className=" flex items-center gap-3">
            <div className="md:hidden" onClick={() => setSidebar(!sidebar)}>
              <GiHamburgerMenu size={25} />
            </div>
            <Link to={"/"}>
              <p className="text-orange-600 text-2xl font-bold sm:block">
                Mansuri<span className="text-black">Mart</span>
              </p>
            </Link>
          </div>
          <div className="hidden font-bold lg:gap-5 gap-3 md:flex pl-5">
            <p>Men</p>
            <p>Women</p>
            <p>Kids</p>
            <p>Blogs</p>
          </div>

          <div className="relative min-w-3 w-3/12 hidden md:block">
            <input
              type="text"
              value={query}
              placeholder="Search for products, brands and more"
              className="w-full text-xs px-2 pl-6 py-1.5 outline-none rounded-sm focus:shadow-sm focus:shadow-red-500"
              onChange={changeHandler}
            />
            <CiSearch className=" absolute top-1.5 left-1" />
            {query.length > 0 && (
              <RxCross1
                size={14}
                className=" absolute top-2 right-1.5 cursor-pointer"
                onClick={queryHandler}
              />
            )}
          </div>

          <div className=" flex gap-2 md:gap-4 justify-between items-center relative">
            <div className="md:hidden" onClick={() => setSearch(true)}>
              <CiSearch size={25} />
            </div>

            <img
              src={user ? user.image.image_url : loginImg}
              className=" rounded-full h-6 w-6 hidden md:block"
              onClick={() => setUserProfile(!userProfile)}
              onMouseEnter={() => setProfile(true)}
              onMouseLeave={() => setProfile(false)}
            />

            {/* user Profile */}
            <div className="absolute top-8 -right-12 z-10">
              {(profile || userProfile) && (
                <User setUserProfile={setUserProfile} />
              )}
            </div>

            <Link to={"/wishlist"}>
              <div className="relative">
                <FaRegHeart size={23} />
                {wishlist?.items?.length > 0 && (
                  <div className="h-4 w-4 rounded-full bg-orange-600 text-gray-100 flex justify-center items-center text-xs absolute -top-1.5 -right-1.5 ">
                    {wishlist?.items?.length}
                  </div>
                )}
              </div>
            </Link>

            <Link to={"/cart"}>
              <div className="relative">
                <MdOutlineShoppingCart size={25} />
                {cart?.items?.length > 0 && (
                  <div className="h-4 w-4 rounded-full bg-orange-600 text-gray-100 flex justify-center items-center text-xs absolute -top-1.5 -right-1.5 ">
                    {cart?.items?.length}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {Search && (
        <div className="relative w-full border">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full text-xs px-5 pl-7 py-2 outline-none shadow-sm shadow-red-600"
            onChange={changeHandler}
            autoFocus
          />
          <CiSearch className=" absolute top-1.5 left-1.5" />

          <RxCross1
            className=" absolute top-1.5 right-2.5"
            onClick={queryHandler}
          />
        </div>
      )}

      <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
    </header>
  );
};

export default Header;
