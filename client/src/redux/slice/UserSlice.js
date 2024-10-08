import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null,

  address: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
});

export const { setUser, setAddress } = userSlice.actions;
export default userSlice.reducer;
