import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomMaterialTable } from "./components/materialUI/table";
import { HANDLER_ACTIONS, useTableReducers } from "./hooks/useTableReducers";
import { ReduxState } from "./interfaces";
import { CustomMaterialSnackbar } from "./components/materialUI/snackbar";
import { CustomMaterialBackdrop } from "./components/materialUI/backdrop";
import { CustomFAB, FAB_TYPE } from "./components/materialUI/fab";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./components/materialUI/theme";
import { CustomMaterialDialog } from "./components/materialUI/dialog";

const AppContainer = styled.main.attrs({ className: "app-container" })`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100vh;
`;

const LoadFABContainer = styled.div.attrs({ className: "load-fab-container" })`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ActionsFABContainer = styled.div.attrs({
  className: "actions-fab-container",
})`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

export const App = () => {
  const {
    data: tableData,
    loading: isLoading,
    responseStatus,
  } = useSelector((state: { tableState: ReduxState }) => state.tableState);

  const { handleAddOrDelete, handleLoad } = useTableReducers();

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        {process.env.NODE_ENV !== "development" && <CustomMaterialDialog />}

        {!tableData.length && (
          <LoadFABContainer>
            <CustomFAB delay="1s" type={FAB_TYPE.LOAD} onClick={handleLoad} />
          </LoadFABContainer>
        )}

        <CustomMaterialTable rows={tableData} />

        <ActionsFABContainer>
          <CustomFAB
            delay="1.2s"
            type={FAB_TYPE.ADD}
            onClick={() => handleAddOrDelete(HANDLER_ACTIONS.ADD)}
          />
          <CustomFAB
            delay="1.4s"
            type={FAB_TYPE.DELETE}
            onClick={() => handleAddOrDelete(HANDLER_ACTIONS.DELETE)}
          />
        </ActionsFABContainer>

        {isLoading && <CustomMaterialBackdrop isLoading={isLoading} />}
        {responseStatus.message && (
          <CustomMaterialSnackbar data={responseStatus} />
        )}
      </AppContainer>
    </ThemeProvider>
  );
};
