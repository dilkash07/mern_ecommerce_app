import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderItem: [],
  shippingInfo: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orders = action.payload;
    },
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setOrderItem: (state, action) => {
      state.orderItem = action.payload;
    },
  },
});

export const { setOrder, setOrderItem, setShippingInfo } = orderSlice.actions;
export default orderSlice.reducer;
