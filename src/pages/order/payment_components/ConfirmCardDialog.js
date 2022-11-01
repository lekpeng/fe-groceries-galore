import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmCardDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">Make payment with this card?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleClose} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmCardDialog;
