import React from "react";

const Filter = () => {
  const filterProducts = [
    "Earpodes",
    "Camera",
    "Earphones",
    "Mobiles",
    "MOuse",
    "Printers",
    "Processor",
    "Refrigerator",
    "Speaker",
    "Trimmer",
    "Television",
    "Watches",
    "Charger",
    "Powerbank",
    "Keyboard",
  ];

  return (
    <div className="h-full min-h-[80vh] min-w-52 bg-orange-200 px-3 py-3">
      <div>
        <h1 className=" font-semibold border-b border-yellow-600">SORT BY</h1>
        <div>
          <label className="flex gap-2">
            <input type="radio" name="price" />
            <p>Price - Low to High</p>
          </label>
          <label className="flex gap-2">
            <input type="radio" name="price" />
            <p>Price - High to Low</p>
          </label>
        </div>
      </div>
      <div>
        <h1 className=" font-semibold border-b border-yellow-600 mt-2">
          CATEGORY
        </h1>
        <div>
          {filterProducts.map((item) => (
            <label className="flex gap-2">
              <input type="checkbox" name={`${item.toLowerCase()}`} />
              <p>{item}</p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
