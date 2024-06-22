import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCart, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
