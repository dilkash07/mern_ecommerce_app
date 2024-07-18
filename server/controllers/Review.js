const Product = require("../models/Product");

exports.addReviews = async (req, res) => {
  try {
    const { id, name } = req.user;
    const { productId, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const product = await Product.findById(productId);

    if (product) {
      const isReviewd = product.reviews.find(
        (r) => r.user.toString() === id.toString()
      );

      if (isReviewd) {
        product.reviews.forEach((r) => {
          if (r.user.toString() === id.toString()) {
            r.rating = rating;
            r.comment = comment;
          }
        });
      } else {
        const review = {
          user: id,
          name,
          rating: Number(rating),
          comment,
        };

        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
      }
    }

    let avgRating = 0;
    product.reviews.forEach((r) => {
      avgRating += r.rating;
    });

    product.rating = Math.round((avgRating / product.numOfReviews) * 10) / 10;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      response: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding reviews",
    });
  }
};
