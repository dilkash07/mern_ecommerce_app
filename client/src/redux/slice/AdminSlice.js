import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  users: [],
  products: [],
  categories: [],
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
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setOrders, setUsers, setProducts, setCategories } =
  adminSlice.actions;
export default adminSlice.reducer;
