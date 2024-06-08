import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addWish: (state, actions) => {
      const isFind = state.find((item) => item.id === actions.payload.id);
      if (isFind) {
        return state.filter((item) => item.id !== actions.payload);
      } else {
        state.push(actions.payload);
      }
    },
    removeWish: (state, actions) => {
      return state.filter((item) => item.id !== actions.payload);
    },
  },
});

export const { addWish, removeWish } = wishlistSlice.actions;
export default wishlistSlice.reducer;
