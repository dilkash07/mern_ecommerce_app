import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = adminSlice.actions;
export default adminSlice.reducer;
