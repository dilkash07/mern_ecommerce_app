import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const LoaderSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = LoaderSlice.actions;
export default LoaderSlice.reducer;
