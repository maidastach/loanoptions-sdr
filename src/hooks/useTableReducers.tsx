import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { ReduxState } from "../interfaces";
import { tableActions } from "../store";

const QUERY = "search?country=Australia/";

export enum RESPONSE_MESSAGES {
  DATA_LOADED = "Data Loaded Succesfully",
  ERROR_FETCH_DATA = "Error Fetching Data. Try Again.",
  FIRST_NEED_LOAD_DATA = "You must load the data first",
  VOID_ERROR = "",
  ADD_SUCCESS = "Entry added succesfully",
  DELETE_SUCCESS = "Entry deleted succesfully",
}

export enum HANDLER_ACTIONS {
  ADD = "ADD_SUCCESS",
  DELETE = "DELETE_SUCCESS",
}

export const useTableReducers = () => {
  // I COULD ALSO HAVE USED REACT USESTATE FOR LOADING, AND ERROR/SUCCESS MESSAGES LIKE THAT:
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useDispatch();
  const { data: tableData } = useSelector(
    (state: { tableState: ReduxState }) => state.tableState
  );

  const handleLoad = useCallback(async (): Promise<void> => {
    try {
      // dispatch loding true
      dispatch(tableActions.setLoading(true));

      // fetching data
      const response = await axios.get(QUERY);

      // dispatch load data
      dispatch(tableActions.loadData(response.data));

      // dispatch success
      dispatch(
        tableActions.setResponseStatus({
          message: RESPONSE_MESSAGES.DATA_LOADED,
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
            RESPONSE_MESSAGES.ERROR_FETCH_DATA,
          error: true,
        })
      );
    } finally {
      // dispatch loding false
      dispatch(tableActions.setLoading(false));

      // removing messages after 3s
      setTimeout(() => {
        dispatch(
          tableActions.setResponseStatus({
            message: RESPONSE_MESSAGES.VOID_ERROR,
            error: false,
          })
        );
      }, 3000);
    }
  }, [dispatch]);

  const handleAddOrDelete = useCallback(
    (handler_action: HANDLER_ACTIONS): void => {
      try {
        // dispatch loding true
        dispatch(tableActions.setLoading(true));
        if (!tableData.length)
          throw new Error(RESPONSE_MESSAGES.FIRST_NEED_LOAD_DATA);

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
              message: RESPONSE_MESSAGES[handler_action],
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
            tableActions.setResponseStatus({
              message: RESPONSE_MESSAGES.VOID_ERROR,
              error: false,
            })
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
