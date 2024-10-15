import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <header className="w-screen relative shadow-md bg-orange-200 md:px-16 px-4">
      <div className="flex py-2 justify-between items-center flex-wrap">
        <div className="flex gap-16 items-end">
          <p className="text-orange-600 text-2xl font-bold sm:block">
            Mansuri<span className="text-black">Mart</span>
          </p>

          <p className=" text-lg font italic">
            Hello,{" "}
            <span className="font-bold not-italic">
              {user.firstName} {user.lastName}
            </span>
          </p>
        </div>

        <div className="flex gap-1.5 pl-1.5 pr-3 py-1 bg-orange-500 bg-opacity-40 rounded-full font-semibold">
          <img src={user.image.image_url} className="h-6 w-6 rounded-full " />
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
