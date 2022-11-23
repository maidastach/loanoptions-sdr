import { useSelector } from "react-redux";
import { CustomMaterialTable } from "./components/material/table";
import { HANDLER_ACTIONS, useTableReducers } from "./hooks/useTableReducers";
import { ReduxState } from "./interfaces";
import { CustomMaterialSnackbar } from "./components/material/snackbar";
import { CustomMaterialBackdrop } from "./components/material/backdrop";

export const App = () => {
  const {
    data: tableData,
    loading: isLoading,
    responseStatus,
  } = useSelector((state: { tableState: ReduxState }) => state.tableState);

  const { handleAddOrDelete, handleLoad } = useTableReducers();

  return (
    <div>
      <button onClick={handleLoad}>Load</button>
      <button onClick={() => handleAddOrDelete(HANDLER_ACTIONS.ADD)}>
        Add
      </button>
      <button onClick={() => handleAddOrDelete(HANDLER_ACTIONS.DELETE)}>
        Delete
      </button>
      {/* <pre>{JSON.stringify(tableData, null, 4)}</pre> */}
      <CustomMaterialTable rows={tableData} />
      <CustomMaterialBackdrop isLoading={isLoading} />
      {responseStatus.message && (
        <CustomMaterialSnackbar data={responseStatus} />
      )}
    </div>
  );
};
