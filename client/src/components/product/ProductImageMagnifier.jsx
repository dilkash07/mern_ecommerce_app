import React, { useCallback, useState } from "react";

const ProductImageMagnifier = ({ activeImage }) => {
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });

  const lensSize = 120; // Lens size
  const zoomScale = 2.5; // Zoom level (adjust as needed)

  const handleZoomImage = useCallback(
    (e) => {
      if (!activeImage) return; // Prevent errors if no image

      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();

      let x = e.clientX - left;
      let y = e.clientY - top;

      // Prevent lens from moving out of bounds
      x = Math.max(lensSize / 2, Math.min(width - lensSize / 2, x));
      y = Math.max(lensSize / 2, Math.min(height - lensSize / 2, y));

      setLensPosition({ x, y });

      setZoomImageCoordinate({
        x: x / width, // Get percentage-based coordinates
        y: y / height,
      });

      console.log("Zoom Coordinates:", x, y);
    },
    [activeImage]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <div className="relative h-[300px] w-[300px] lg:h-96 lg:w-96 p-2 border rounded-sm">
      {/* Product Image */}
      <img
        src={activeImage}
        className="h-full w-full object-contain"
        onMouseMove={handleZoomImage}
        onMouseLeave={handleLeaveImageZoom}
      />

      {/* Lens Effect */}
      {zoomImage && (
        <div
          className="absolute border border-gray-400 rounded-sm shadow-lg hidden md:block"
          style={{
            width: lensSize,
            height: lensSize / 1.5,
            left: `${lensPosition.x - lensSize / 2}px`,
            top: `${lensPosition.y - lensSize / 2}px`,
            pointerEvents: "none",
            background: `url(${activeImage})`,
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
              zoomImageCoordinate.y * 100
            }%`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}

      {/* Zoomed Image */}
      {zoomImage && (
        <div className="hidden lg:block absolute w-[900px] h-[600px] bg-white p-2 border rounded-sm left-96 top-0 shadow-lg">
          <div
            className="w-full h-full"
            style={{
              background: `url(${activeImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${zoomScale * 100}%`,
              backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                zoomImageCoordinate.y * 100
              }%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProductImageMagnifier;
