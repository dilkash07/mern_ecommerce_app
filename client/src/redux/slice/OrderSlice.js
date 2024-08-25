import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItem: [],
  shippingInfo: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    setOrderItem: (state, action) => {
      state.orderItem = action.payload;
    },
  },
});

export const { setOrderItem, setShippingInfo } = orderSlice.actions;
export default orderSlice.reducer;
