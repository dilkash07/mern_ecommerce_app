import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  categoryQuery: "",
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategoryQuery: (state, action) => {
      state.categoryQuery = action.payload;
    },
  },
});

export const { setQuery, setCategoryQuery } = querySlice.actions;
export default querySlice.reducer;
