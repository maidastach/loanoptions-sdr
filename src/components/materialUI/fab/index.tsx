import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import DownloadForOfflineSharpIcon from "@mui/icons-material/DownloadForOfflineSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces";
import { RESPONSE_MESSAGES } from "../../../hooks/useTableReducers";
import { keyframes } from "@mui/system";
import { useMemo } from "react";

const myPulseEffect = keyframes`
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1);
  }
  75%{
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

export enum FAB_TYPE {
  ADD = "success",
  DELETE = "error",
  LOAD = "info",
}

const renderLabel = (type: FAB_TYPE): string => {
  switch (type) {
    case FAB_TYPE.ADD:
      return "ADD";
    case FAB_TYPE.DELETE:
      return "DELETE";
    case FAB_TYPE.LOAD:
      return "LOAD";
    default:
      return "";
  }
};

const RenderIcon = ({ type }: { type: FAB_TYPE }) => {
  switch (type) {
    case FAB_TYPE.ADD:
      return <AddCircleOutlineSharpIcon />;
    case FAB_TYPE.DELETE:
      return <DeleteSharpIcon />;
    case FAB_TYPE.LOAD:
      return <DownloadForOfflineSharpIcon />;
    default:
      return <></>;
  }
};

export const CustomFAB = ({
  type,
  delay,
  onClick,
}: {
  type: FAB_TYPE;
  delay: string;
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}) => {
  const { responseStatus } = useSelector(
    (state: { tableState: ReduxState }) => state.tableState
  );

  const errorAndDataNotLoaded: boolean = useMemo(
    () =>
      type === FAB_TYPE.LOAD &&
      responseStatus.error &&
      responseStatus.message === RESPONSE_MESSAGES.FIRST_NEED_LOAD_DATA,
    [responseStatus.error, responseStatus.message, type]
  );

  return (
    <Tooltip
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 400 }}
      title={renderLabel(type)}
    >
      <Zoom
        in={true}
        style={{ transitionDelay: delay, transitionDuration: ".5s" }}
      >
        <Fab
          {...(errorAndDataNotLoaded && {
            sx: {
              animation: `${myPulseEffect} 1s ease`,
            },
          })}
          onClick={onClick}
          color={type}
          aria-label={type}
        >
          <RenderIcon type={type} />
        </Fab>
      </Zoom>
    </Tooltip>
  );
};
