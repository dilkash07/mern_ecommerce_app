import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, actions) => {
      const isFind = state.find((item) => item.id === actions.payload.id);
      if (isFind) {
        isFind.quantity = isFind.quantity + 1;
      } else {
        state.push({ ...actions.payload, quantity: 1 });
      }
    },
    remove: (state, actions) => {
      return state.filter((item) => item.id !== actions.payload);
    },
    cartQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.find((item) => item.id === id);
      item.quantity = qty;
    },
  },
});

export const { add, remove, cartQty } = cartSlice.actions;
export default cartSlice.reducer;
