import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const CustomMaterialDialog = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Alert! <br />
        Possible Network Error
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The data is fetched through an HTTP endpoint (insecure-content) and
          may not be fetched. <br />
          To allow insecure content on individual sites within Chrome, <br />
          Click on the lock icon in the URL bar, <br />
          Then click 'Site settings'. <br />
          There you will see a list of various permissions the page has. <br />
          Choose 'Allow' next to 'Insecure content'. <br />
          Now your HTTPS site can access HTTP endpoint
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
