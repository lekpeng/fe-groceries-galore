import toast from "react-hot-toast";
import {
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ToggleRole from "../components/ToggleRole";
import { useRef, useState } from "react";
import userApis from "../utils/apis/user";

function Register() {
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userType, setUserType] = useState("customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });

  const handleClick = (e) => {
    setIsPasswordVisible((prevVisibilityState) => !prevVisibilityState);
  };

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (
        passwordInputRef.current.value !== confirmPasswordInputRef.current.value
      ) {
        confirmPasswordInputRef.current.setCustomValidity(
          "Passwords must match."
        );
      } else {
        confirmPasswordInputRef.current.setCustomValidity("");
      }
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApis.auth(formData, "register", userType);
      console.log("RESPONSE", response);
      if (response.data.error) {
        toast.error(response.error);
        return;
      }
      toast.success(
        "Registration Successful! Check your mailbox for a verification email from us 😄"
      );
      // TO DO: navigate to login
    } catch (err) {
      toast.error(err.response.data.error);
      return;
    }
  };

  const eyeAdornment = isPasswordVisible ? (
    <InputAdornment position="end">
      <VisibilityIcon fontSize="default" onClick={handleClick} />
    </InputAdornment>
  ) : (
    <InputAdornment position="end">
      <VisibilityOffIcon fontSize="default" onClick={handleClick} />
    </InputAdornment>
  );

  return (
    <Container>
      <h1>Register</h1>
      <ToggleRole setUserType={setUserType} />
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 10 }}>
          <TextField
            required
            name="name"
            label="Name"
            onChange={handleChange}
          />
          <TextField
            required
            name="email"
            type="email"
            sx={{ mt: 3 }}
            label="Email"
            onChange={handleChange}
          />

          <TextField
            required
            name="password"
            inputRef={passwordInputRef}
            type={isPasswordVisible ? "input" : "password"}
            sx={{ mt: 3 }}
            label="Password"
            onChange={handleChange}
            InputProps={{
              endAdornment: eyeAdornment,
            }}
            inputProps={{
              minLength: 8,
              maxLength: 16,
            }}
          />
          <TextField
            required
            name="confirmPassword"
            inputRef={confirmPasswordInputRef}
            className="register__confirmPassword"
            type={isPasswordVisible ? "input" : "password"}
            sx={{ mt: 3 }}
            label="Password again"
            onChange={handleChange}
            InputProps={{
              endAdornment: eyeAdornment,
            }}
            inputProps={{
              minLength: 8,
              maxLength: 16,
            }}
          />

          <TextField
            required
            name="address"
            sx={{ mt: 3 }}
            label="Address"
            onChange={handleChange}
          />
          <TextField
            required
            name="phoneNumber"
            sx={{ mt: 3 }}
            label="Phone Number"
            onChange={handleChange}
          />

          <FormHelperText id="my-helper-text">
            We'll never share your personal details.
          </FormHelperText>
          <Button
            type="submit"
            sx={{ mt: 3 }}
            variant="contained"
            color="success"
          >
            Register
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default Register;
