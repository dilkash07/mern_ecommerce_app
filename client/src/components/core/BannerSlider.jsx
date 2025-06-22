import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import img1 from "../../assets/banner/img1.webp";
import img2 from "../../assets/banner/img2.jpg";
import img3 from "../../assets/banner/img3.jpg";
import img4 from "../../assets/banner/img4.webp";
import img5 from "../../assets/banner/img5.webp";
import img6 from "../../assets/banner/img6.webp";

const BannerSlider = () => {
  const images = [img1, img2, img3, img4, img5, img6];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative mx-auto p-5">
      <div className=" overflow-x-scroll scrollbar-none md:overflow-hidden relative rounded-md">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-7 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none hidden md:block"
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-7 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 focus:outline-none hidden md:block"
      >
        <FaAngleRight />
      </button>

      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex
                ? "bg-gray-600 bg-opacity-200 scale-125 transition-all"
                : "bg-gray-400 bg-opacity-50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;
