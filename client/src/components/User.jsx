import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";

const User = ({ setUserProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };
  return (
    <div
      className="h-1/2 w-72 shadow-md z-10"
      onMouseLeave={() => setUserProfile(false)}
    >
      <div className="h-1 w-12 mx-auto mb-0.5 bg-orange-600"></div>
      <div className="w-full min-h-full bg-orange-200 rounded-sm px-5 py-4">
        <div className="text-orange-600 border-b border-yellow-600 ">
          {user == null ? (
            <p>
              <Link to={"/login"} className="font-semibold hover:font-bold">
                Login / Signup
              </Link>{" "}
              <p className=" text-sm font-normal text-gray-600  pb-1 italic">
                to Access your profile
              </p>
            </p>
          ) : (
            <div>
              <p className="font-semibold">Hello {user.firstName}</p>
              <p className=" text-sm font-normal text-gray-600 pb-1 italic">
                Welcome to Mansuri Mart
              </p>
            </div>
          )}
        </div>
        <div className="py-2 ">
          <p className="hover:font-bold">
            <Link>My Profile</Link>
          </p>
          <p className="hover:font-bold">
            <Link>Orders</Link>
          </p>
          <p className="hover:font-bold">
            <Link to={"/wishlist"}>Wishlist</Link>
          </p>
          <p className="hover:font-bold">
            <Link>Contact Us</Link>
          </p>
          <p className="hover:font-bold">
            <Link>Mansuri Insider</Link>
          </p>
        </div>
        <div className="border-t border-yellow-600 py-2">
          <p className="hover:font-bold">Mansuri Credit</p>
          <p className="hover:font-bold">Gift Card</p>
          <p className="hover:font-bold">Coupon</p>
          <p className="hover:font-bold">Saved Card</p>
          <p className="hover:font-bold">Saved Vpa</p>
          <p className="hover:font-bold">Saved Address</p>
        </div>
        <div className="border-t border-yellow-600 py-2">
          <div className="hover:font-bold">
            <Link to={"/uploadProduct"}>Login for Admin</Link>
          </div>
          {user && (
            <button className="hover:font-bold" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
