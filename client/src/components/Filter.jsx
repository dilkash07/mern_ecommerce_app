import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredProduct } from "../services/operations/ProductAPI";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { setCategoryQuery } from "../redux/slice/QuerySlice";

const Filter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { query, categoryQuery } = useSelector((state) => state.query);
  const { product } = useSelector((state) => state.product);

  const categoryProduct = [];
  const brandProduct = [];

  product?.filter((item) => {
    if (!categoryProduct.includes(item.category)) {
      categoryProduct.push(item.category);
    }
    if (!brandProduct.includes(item.brand)) {
      brandProduct.push(item.brand);
    }
  });

  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDiscount, setMinDiscount] = useState("");
  const [minRating, setMinRating] = useState("");

  const changeSortHandler = (event) => {
    setSortOrder(event.target.value);
  };

  const changeCategoryHandler = (event) => {
    const value = event.target.value;
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const changeBrandHandler = (event) => {
    const value = event.target.value;
    setBrands((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const changePriceHandler = (value) => {
    setPriceRange(value);
    setMinPrice(value[0] === 0 ? "" : value[0]);
    setMaxPrice(value[1] === 3500 ? "" : value[1]);
  };

  const changeMinPriceHandler = (event) => {
    const value = event.target.value;
    setMinPrice(value);
    setPriceRange([
      value === "" ? 0 : value,
      maxPrice === "" ? 3500 : maxPrice,
    ]);
  };

  const changeMaxPriceHandler = (event) => {
    const value = event.target.value;
    setMaxPrice(value);
    setPriceRange([
      minPrice === "" ? 0 : minPrice,
      value === "" ? 3500 : value,
    ]);
  };

  const changeDiscountHandler = (event) => {
    setMinDiscount(event.target.value);
  };

  const changeRatingHadler = (event) => {
    setMinRating(event.target.value);
  };

  const clearAllHandler = () => {
    setSortOrder("");
    setCategories([]);
    setBrands([]);
    setPriceRange([0, 3500]);
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
    setMinDiscount("");
  };

  useEffect(() => {
    let category = categories.join("%");
    let brand = brands.join("%");

    if (categoryQuery) {
      category = categoryQuery;
      dispatch(
        getFilteredProduct(
          query,
          category,
          brand,
          minPrice,
          maxPrice,
          minDiscount,
          minRating,
          sortOrder,
          navigate
        )
      );
      setCategories([categoryQuery]);
      dispatch(setCategoryQuery(""));
    } else {
      dispatch(
        getFilteredProduct(
          query,
          category,
          brand,
          minPrice,
          maxPrice,
          minDiscount,
          minRating,
          sortOrder,
          navigate
        )
      );
    }
  }, [
    query,
    categories,
    brands,
    minPrice,
    maxPrice,
    minDiscount,
    minRating,
    sortOrder,
  ]);

  return (
    <div className="h-full min-h-[80vh] min-w-52 p-5 overflow-y-scroll scrollbar-none border-x">
      <div className="flex justify-between mb-3">
        <h1 className=" font-bold">FILTERS</h1>
        <button
          className="text-xs font-semibold text-orange-600"
          onClick={clearAllHandler}
        >
          CLEAR ALL
        </button>
      </div>
      <div>
        <h1 className=" font-semibold border-b border-yellow-600">SORT BY</h1>
        <div>
          <label className="flex gap-2">
            <input
              type="radio"
              name="price"
              value={"ascending"}
              checked={sortOrder === "ascending"}
              onChange={changeSortHandler}
            />
            <p>Price - Low to High</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="price"
              value={"descending"}
              checked={sortOrder === "descending"}
              onChange={changeSortHandler}
            />
            <p>Price - High to Low</p>
          </label>
        </div>
      </div>
      <div>
        <h1 className=" font-semibold border-b border-yellow-600 mt-2">
          CATEGORY
        </h1>
        <div>
          {categoryProduct.map((item, key) => (
            <label className="flex gap-2" key={key}>
              <input
                type="checkbox"
                name={`${item}`}
                value={`${item.toString()}`}
                onChange={changeCategoryHandler}
                checked={categories.includes(item)}
              />
              <p>{item}</p>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h1 className=" font-semibold border-b border-yellow-600 mt-2">
          BRAND
        </h1>
        <div>
          {brandProduct.map((item, key) => (
            <label className="flex gap-2" key={key}>
              <input
                type="checkbox"
                name={"brand"}
                value={`${item.toString()}`}
                onChange={changeBrandHandler}
                checked={brands.includes(item)}
              />
              <p>{item}</p>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h1 className=" font-semibold border-b border-yellow-600 mt-2">
          PRICE RANGE
        </h1>
        <div className="mt-2">
          <Slider
            range
            min={0}
            max={3500}
            step={500}
            dots={true}
            defaultValue={0}
            onChange={changePriceHandler}
            value={priceRange}
          />
        </div>
        <div className="flex justify-between mt-2">
          <select
            className=" outline-none border border-gray-500 rounded-sm px-1"
            name="minPrice"
            value={minPrice}
            onChange={changeMinPriceHandler}
          >
            <option value={""}>Min</option>
            <option value={500}>₹500</option>
            <option value={1000}>₹1000</option>
            <option value={1500}>₹1500</option>
            <option value={2000}>₹2000</option>
            <option value={2500}>₹2500</option>
            <option value={3000}>₹3000</option>
          </select>
          <span>To</span>
          <select
            name="maxPrice"
            className=" outline-none border border-gray-500 rounded-sm px-1"
            value={maxPrice}
            onChange={changeMaxPriceHandler}
          >
            <option value={500}>₹500</option>
            <option value={1000}>₹1000</option>
            <option value={1500}>₹1500</option>
            <option value={2000}>₹2000</option>
            <option value={2500}>₹2500</option>
            <option value={3000}>₹3000</option>
            <option value={""}>₹3000+</option>
          </select>
        </div>
        <div>
          <h1 className=" font-semibold border-b border-yellow-600 mt-2">
            DISCOUNT RANGE
          </h1>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={10}
              onChange={changeDiscountHandler}
              checked={minDiscount === "10"}
            />
            <p>10% and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={20}
              onChange={changeDiscountHandler}
              checked={minDiscount === "20"}
            />
            <p>20% and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={30}
              onChange={changeDiscountHandler}
              checked={minDiscount === "30"}
            />
            <p>30% and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={40}
              onChange={changeDiscountHandler}
              checked={minDiscount === "40"}
            />
            <p>40% and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={50}
              onChange={changeDiscountHandler}
              checked={minDiscount === "50"}
            />
            <p>50% and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={60}
              onChange={changeDiscountHandler}
              checked={minDiscount === "60"}
            />
            <p>60% and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="discountRange"
              value={70}
              onChange={changeDiscountHandler}
              checked={minDiscount === "70"}
            />
            <p>70% and above</p>
          </label>
        </div>
        <div>
          <h1 className=" font-semibold border-b border-yellow-600 mt-2">
            CUSTOMER RATING
          </h1>
          <label className="flex gap-2">
            <input
              type="radio"
              name="ratingRange"
              value={4}
              onChange={changeRatingHadler}
              checked={minRating === "4"}
            />
            <p>4★ and above</p>
          </label>
          <label className="flex gap-2">
            <input
              type="radio"
              name="ratingRange"
              value={3}
              onChange={changeRatingHadler}
              checked={minRating === "3"}
            />
            <p>3★ and above</p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filter;
