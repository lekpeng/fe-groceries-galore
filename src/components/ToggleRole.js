import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import "./ToggleRole.css";

function ToggleRole() {
  const labelElm = useRef();
  const switchElm = useRef();
  const handleChange = (e) => {
    if (e.target.checked) {
      labelElm.current.innerText = "Customer";
    } else {
      labelElm.current.innerText = "Merchant";
    }
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      <Switch className="toggleRole" ref={switchElm} onChange={handleChange} defaultChecked />
      <Typography ref={labelElm}>Customer</Typography>
    </Stack>
  );
}

export default ToggleRole;
