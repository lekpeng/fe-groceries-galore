import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRef } from "react";

function ToggleNewPaymentMethod({ setNewPaymentMethod }) {
  const labelElm = useRef();
  const switchElm = useRef();
  const handleChange = (e) => {
    if (e.target.checked) {
      labelElm.current.innerText = "Existing card";
      setNewPaymentMethod(false);
    } else {
      labelElm.current.innerText = "New card";
      setNewPaymentMethod(true);
    }
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      <Switch className="toggleUserType" ref={switchElm} onChange={handleChange} />
      <Typography ref={labelElm}>New card</Typography>
    </Stack>
  );
}

export default ToggleNewPaymentMethod;
