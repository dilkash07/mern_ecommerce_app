import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  queries: "",
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setQueries: (state, action) => {
      state.queries = action.payload;
    },
  },
});

export const { setQuery, setQueries } = querySlice.actions;
export default querySlice.reducer;
