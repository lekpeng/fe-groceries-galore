import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

function ConfirmPaymentDialog({ openDialog, setOpenDialog, setConfirmCard }) {
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Make payment with this card?</DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setConfirmCard(true);
            }}>
            YES
          </Button>
          <Button onClick={handleClose}>NO</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmPaymentDialog;
