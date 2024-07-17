const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryImage: {
    public_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Category", productCategorySchema);
