import React from "react";

const Loader = () => {
  return (
    <div className="h-full w-full bg-white bg-opacity-50 grid place-items-center absolute top-0 right-0 z-10">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
