import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  ordersAndRevenue: null,
  users: null,
  user: null,
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
    setOrdersAndRevenue: (state, action) => {
      state.ordersAndRevenue = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
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

export const {
  setOrders,
  setOrdersAndRevenue,
  setUsers,
  setUser,
  setProducts,
  setProduct,
  setCategories,
} = adminSlice.actions;
export default adminSlice.reducer;
