import React, { useEffect } from "react";
import { TfiEmail } from "react-icons/tfi";
import { FiPhone } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FaPinterest } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/authAPI";

const Sidenav = ({ user }) => {
  // const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <div>
      <div className=" w-11/12 max-w-96 font-bold gap-3 px-5 absolute left-0 bg-orange-200 py-5 overflow-scroll">
        {/* <RxCross1 size={20} onClick={() => setSidebar(false)} /> */}
        <div className=" leading-10 py-5 border-b-2 border-yellow-600">
          <h1 className=" italic">Welcome!</h1>
          <div className="text-orange-600">
            {user == null ? (
              <p>
                <Link to={"/login"}>Login / Signup</Link>{" "}
                <span className=" text-xs font-normal text-gray-600">
                  to Access your profile
                </span>
              </p>
            ) : (
              <div>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            )}
          </div>
        </div>
        <div className=" leading-10 py-5 border-b-2 border-yellow-600">
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          <p>Blogs</p>
          <p className=" font-normal">VIDEO CALL</p>
          <p className=" font-normal">STORE LOCATOR</p>
        </div>
        <div className=" leading-10 py-5 border-b-2 border-yellow-600">
          <h1>CONTACT</h1>
          <p className=" flex gap-3 items-center text-gray-700">
            <TfiEmail size={20} />
            <span className=" font-normal text-sm underline">
              care@mansurimart.com
            </span>
          </p>
          <div className="flex items-center gap-5 text-gray-700 text-sm font-semibold">
            <FiPhone size={20} />
            <div className=" mt-5">
              <p>
                <span className=" underline">1800 120 000 500</span> (India)
              </p>
              <p>
                <span className=" underline">+919674373838</span>
                (International)
              </p>
            </div>
          </div>
        </div>
        <div className="flex text-orange-600 py-10 justify-around ">
          <div className="px-1 py-1.5 w-6 bg-orange-200 rounded-sm ">
            <FaFacebookF />
          </div>
          <div className="px-1 py-1.5 w-6 bg-orange-200 rounded-sm ">
            <FaTwitter />
          </div>
          <div className="px-1 py-1.5 w-6 bg-orange-200 rounded-sm ">
            <FaInstagram />
          </div>
          <div className="px-1 py-1.5 w-6 bg-orange-200 rounded-sm ">
            <FaLinkedinIn />
          </div>
          <div className="px-1 py-1.5 w-6 bg-orange-200 rounded-sm ">
            <TfiYoutube />
          </div>
          <div className="px-1 py-1.5 w-6 bg-orange-200 rounded-sm ">
            <FaPinterest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
