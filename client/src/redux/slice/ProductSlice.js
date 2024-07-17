import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  filteredProduct: [],
  productCategories: [],
  recommendedProduct: [],
  productDetails: [],
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setFilteredProduct: (state, action) => {
      state.filteredProduct = action.payload;
    },
    setProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
    setRecommendedProduct: (state, action) => {
      state.recommendedProduct = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setProduct,
  setFilteredProduct,
  setProductCategories,
  setRecommendedProduct,
  setProductDetails,
  setLoading,
} = productSlice.actions;
export default productSlice.reducer;
