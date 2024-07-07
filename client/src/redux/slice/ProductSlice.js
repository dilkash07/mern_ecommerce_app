import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  filteredProduct: [],
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProduct, setFilteredProduct, setLoading } =
  productSlice.actions;
export default productSlice.reducer;
