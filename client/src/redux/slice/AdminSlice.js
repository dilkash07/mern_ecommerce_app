import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  users: null,
  products: null,
  product: null,
  categories: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setOrders, setUsers, setProducts, setProduct, setCategories } =
  adminSlice.actions;
export default adminSlice.reducer;
