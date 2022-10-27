import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import "./ToggleUserType.css";

function ToggleUserType({ setUserType }) {
  const labelElm = useRef();
  const switchElm = useRef();
  const handleChange = (e) => {
    if (e.target.checked) {
      labelElm.current.innerText = "Customer";
    } else {
      labelElm.current.innerText = "Merchant";
    }
    setUserType(labelElm.current.innerText);
  };

  return (
    <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      <Switch className="toggleUserType" ref={switchElm} onChange={handleChange} defaultChecked />
      <Typography ref={labelElm}>Customer</Typography>
    </Stack>
  );
}

export default ToggleUserType;
