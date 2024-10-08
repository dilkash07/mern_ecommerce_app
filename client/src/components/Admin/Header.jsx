import React from "react";

const Header = () => {
  return (
    <header className="w-screen relative shadow-md bg-orange-200 md:px-16 px-4">
      <div className="max-w-7xl flex py-2 justify-between items-center flex-wrap mx-auto">
        <p className="text-orange-600 text-2xl font-bold sm:block">
          Mansuri<span className="text-black">Mart</span>
        </p>
        <button className="px-3 py-1 bg-orange-500 bg-opacity-40 rounded-full font-bold">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
