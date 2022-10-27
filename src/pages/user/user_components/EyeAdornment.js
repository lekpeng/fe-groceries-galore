import { InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./EyeAdornment.css";

function EyeAdornment({ isPasswordVisible, handleClick }) {
  return isPasswordVisible ? (
    <InputAdornment position="end">
      <VisibilityIcon className="eyeAdornment__icon" fontSize="default" onClick={handleClick} />
    </InputAdornment>
  ) : (
    <InputAdornment position="end">
      <VisibilityOffIcon className="eyeAdornment__icon" fontSize="default" onClick={handleClick} />
    </InputAdornment>
  );
}

export default EyeAdornment;
