import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { theme } from "../theme";

export const CustomMaterialBackdrop = ({
  isLoading,
}: {
  isLoading: boolean;
}) => {
  return (
    <Backdrop
      sx={{
        color: theme.palette.text.primary,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
