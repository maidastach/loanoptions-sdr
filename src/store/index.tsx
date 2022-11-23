import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ReduxState } from "../interfaces";
import reducers from "./reducers";

const INITIAL_STATE: ReduxState = {
  loading: false,
  data: [],
  responseStatus: { message: "", error: false },
};

export const tableSlice = createSlice({
  name: "tableState",
  initialState: INITIAL_STATE,
  reducers: reducers,
});

export const store = configureStore({
  reducer: {
    tableState: tableSlice.reducer,
  },
});

export const tableActions = tableSlice.actions;
