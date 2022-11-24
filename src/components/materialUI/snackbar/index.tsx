import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { ReduxState } from "../../../interfaces";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomMaterialSnackbar = ({
  data,
}: {
  data: ReduxState["responseStatus"];
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      open={!!data.message}
    >
      <Alert severity={data.error ? "error" : "success"} sx={{ width: "100%" }}>
        {data.message}
      </Alert>
    </Snackbar>
  );
};
