import React from "react";
import ReactImageMagnify from "react-image-magnify";

const ProductImageZoom = ({ imageSrc, imageAlt }) => {
  return (
    <div className="max-w-md mx-auto p-4">
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: imageAlt,
            isFluidWidth: true,
            src: imageSrc,
          },
          largeImage: {
            src: imageSrc,
            width: 1200,
            height: 1800,
          },
          lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
          enlargedImageContainerStyle: { zIndex: 1000 },
        }}
      />
    </div>
  );
};

export default ProductImageZoom;
