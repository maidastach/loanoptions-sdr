import { PayloadAction } from "@reduxjs/toolkit";
import { ReduxState, TableData } from "../interfaces";

export const loadData = (
  state: ReduxState,
  action: PayloadAction<ReduxState["data"]>
) => {
  state.data = action.payload;
};

export const addEntry = (
  state: ReduxState,
  action: PayloadAction<TableData>
) => {
  state.data = [...state.data, action.payload];
};

export const deleteEntry = (state: ReduxState) => {
  state.data.splice(-1, 1);
};

export const setLoading = (
  state: ReduxState,
  action: PayloadAction<boolean>
) => {
  state.loading = action.payload;
};

export const setResponseStatus = (
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
