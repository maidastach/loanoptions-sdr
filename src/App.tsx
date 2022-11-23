import { useSelector } from "react-redux";
import { HANDLER_ACTIONS, useTableReducers } from "./hooks/useTableReducers";
import { ReduxState } from "./interfaces";

export const App = () => {
  const {
    data: tableData,
    loading: isLoading,
    error: errorMessage,
    success: successMessage,
  } = useSelector((state: { tableState: ReduxState }) => state.tableState);

  const { handleAddOrDelete, handleLoad } = useTableReducers();

  return (
    <div>
      <br />
      <br />
      <br />
      {`Loading: ${isLoading}`}
      <br />
      {`Success: ${successMessage}`}
      <br />
      {`Error: ${errorMessage}`}
      <br />
      <br />
      <br />
      <button onClick={handleLoad}>Load</button>
      <button onClick={() => handleAddOrDelete(HANDLER_ACTIONS.ADD)}>
        Add
      </button>
      <button onClick={() => handleAddOrDelete(HANDLER_ACTIONS.DELETE)}>
        Delete
      </button>
      <pre>{JSON.stringify(tableData, null, 4)}</pre>
    </div>
  );
};
