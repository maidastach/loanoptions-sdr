import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { ReduxState } from "../interfaces";
import { tableActions } from "../store";

const QUERY = "search?country=Australia";

export enum HANDLER_ACTIONS {
  ADD = "add",
  DELETE = "delet",
}

export const useTableReducers = () => {
  // I COULD ALSO HAVE USED REACT USESTATE FOR LOADING, AND ERROR/SUCCESS MESSAGES LIKE THAT:
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useDispatch();
  const { data: tableData } = useSelector(
    (state: { tableState: ReduxState }) => state.tableState
  );

  const handleLoad = useCallback(async () => {
    try {
      // dispatch loding true
      dispatch(tableActions.setLoading(true));

      // fetching data
      const response = await axios.get(QUERY);

      // dispatch load data
      dispatch(tableActions.loadData(response.data));
      console.log(response.data);

      // dispatch success
      dispatch(
        tableActions.setResponseStatus({
          message: "Data Loaded Succesfully",
          error: false,
        })
      );
    } catch (error: any) {
      console.error(error);

      // dispatch new error
      dispatch(
        tableActions.setResponseStatus({
          message:
            error?.message ||
            error?.data?.message ||
            "Error Fetching Data. Try Again.",
          error: true,
        })
      );
    } finally {
      // dispatch loding false
      dispatch(tableActions.setLoading(false));

      // removing messages after 3s
      setTimeout(() => {
        dispatch(tableActions.setResponseStatus({ message: "", error: false }));
      }, 3000);
    }
  }, [dispatch]);

  const handleAddOrDelete = useCallback(
    (handler_action: HANDLER_ACTIONS.ADD | HANDLER_ACTIONS.DELETE) => {
      try {
        // dispatch loding true
        dispatch(tableActions.setLoading(true));
        if (!tableData.length) throw new Error("You must load the data first");

        // simulating POST/DELETE request
        setTimeout(() => {
          // dispatch add entry
          if (handler_action === HANDLER_ACTIONS.ADD)
            dispatch(tableActions.addEntry(tableData[0]));
          // dispatch delete entry
          else if (handler_action === HANDLER_ACTIONS.DELETE)
            dispatch(tableActions.deleteEntry());

          // dispatch success
          dispatch(
            tableActions.setResponseStatus({
              message: `Entry ${handler_action}ed succesfully`,
              error: false,
            })
          );

          // dispatch loding false
          dispatch(tableActions.setLoading(false));
        }, 1000);
      } catch (error: any) {
        console.error(error);

        // dispatch new error
        dispatch(
          tableActions.setResponseStatus({
            message:
              error?.message ||
              error?.data?.message ||
              `Error ${handler_action}ing entry. Try Again.`,
            error: true,
          })
        );

        // dispatch loding false
        dispatch(tableActions.setLoading(false));
      } finally {
        // removing messages after 3s
        setTimeout(() => {
          dispatch(
            tableActions.setResponseStatus({ message: "", error: false })
          );
        }, 3000);
      }
    },
    [dispatch, tableData]
  );

  return {
    handleAddOrDelete,
    handleLoad,
  };
};
