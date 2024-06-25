import React, { useEffect } from "react";
import Sidenav from "./Sidenav";
import { useSelector } from "react-redux";

const Sidebar = ({ sidebar }) => {
  const { user } = useSelector((state) => state.user);

  return <div className=" z-10">{sidebar && <Sidenav user={user} />}</div>;
};

export default Sidebar;
