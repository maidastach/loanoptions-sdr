import { PayloadAction } from "@reduxjs/toolkit";
import { ReduxState, TableData } from "../interfaces";

const loadData = (
  state: ReduxState,
  action: PayloadAction<ReduxState["data"]>
) => {
  state.data = action.payload;
};

const addEntry = (state: ReduxState, action: PayloadAction<TableData>) => {
  state.data = [...state.data, action.payload];
};

const deleteEntry = (state: ReduxState) => {
  state.data.splice(-1, 1);
};

const setLoading = (state: ReduxState, action: PayloadAction<boolean>) => {
  state.loading = action.payload;
};

const setResponseStatus = (
  state: ReduxState,
  action: PayloadAction<ReduxState["responseStatus"]>
) => {
  state.responseStatus = action.payload;
};

const reducers = {
  loadData,
  addEntry,
  deleteEntry,
  setLoading,
  setResponseStatus,
};

export default reducers;
