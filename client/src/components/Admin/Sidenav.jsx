import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FaPinterest } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineFactCheck } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";

const Sidenav = () => {
  return (
    <div>
      <div className="min-w-64 min-h-screen font-bold py-10 pl-5 flex flex-col bg-orange-200 justify-between border-r border-r-orange-500">
        <div className="flex flex-col gap-4">
          <NavLink
            to={"/admin/dashboard"}
            className={({ isActive }) =>
              `flex gap-2 items-center border border-r-0 rounded-md rounded-r-none border-orange-500 px-4 py-2 ${
                isActive && "bg-orange-500 bg-opacity-40"
              }`
            }
          >
            <MdOutlineDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink
            to={"/admin/addItems"}
            className={({ isActive }) =>
              `flex gap-2 items-center border border-r-0 rounded-md rounded-r-none border-orange-500 px-4 py-2 ${
                isActive && "bg-orange-500 bg-opacity-40"
              }`
            }
          >
            <FiPlusCircle size={20} />
            Add Items
          </NavLink>
          <NavLink
            to={"/admin/listItems"}
            className={({ isActive }) =>
              `flex gap-2 items-center border border-r-0 rounded-md rounded-r-none border-orange-500 px-4 py-2 ${
                isActive && "bg-orange-500 bg-opacity-40"
              }`
            }
          >
            <MdOutlineFactCheck size={20} />
            List Items
          </NavLink>
          <NavLink
            to={"/admin/orders"}
            className={({ isActive }) =>
              `flex gap-2 items-center border border-r-0 rounded-md rounded-r-none border-orange-500 px-4 py-2 ${
                isActive && "bg-orange-500 bg-opacity-40"
              }`
            }
          >
            <BsBoxSeam size={20} />
            Orders
          </NavLink>
          <NavLink
            to={"/admin/users"}
            className={({ isActive }) =>
              `flex gap-2 items-center border border-r-0 rounded-md rounded-r-none border-orange-500 px-4 py-2 ${
                isActive && "bg-orange-500 bg-opacity-40"
              }`
            }
          >
            <FiUsers size={20} />
            Users
          </NavLink>
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
