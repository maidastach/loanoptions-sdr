import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const tableSlice = createSlice({
  name: "table",
  initialState: [],
  reducers: reducers,
});

export const cartActions = tableSlice.actions;
