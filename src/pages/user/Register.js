import { useRef, useState } from "react";
import toast from "react-hot-toast";
import EyeAdornment from "./user_components/EyeAdornment";
import ToggleUserType from "./user_components/ToggleUserType";
import userApis from "../../apis/user";
import { Container, FormControl, FormHelperText, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Register() {
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userType, setUserType] = useState("Customer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userApis.auth(formData, userType, "register");
      toast.success(
        "Registration Successful! Check your mailbox for a verification email from us 😄"
      );
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      if (passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
        confirmPasswordInputRef.current.setCustomValidity("Passwords must match.");
      } else {
        confirmPasswordInputRef.current.setCustomValidity("");
      }
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    setIsPasswordVisible((prevVisibilityState) => !prevVisibilityState);
  };

  return (
    <>
      <h1>Register</h1>
      <ToggleUserType setUserType={setUserType} />
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 10 }}>
          <TextField required name="name" label="Name" onChange={handleChange} />
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
              endAdornment: (
                <EyeAdornment isPasswordVisible={isPasswordVisible} handleClick={handleClick} />
              ),
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
              endAdornment: (
                <EyeAdornment isPasswordVisible={isPasswordVisible} handleClick={handleClick} />
              ),
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

          <FormHelperText>We'll never share your personal details.</FormHelperText>
          <Button type="submit" sx={{ mt: 3 }} variant="contained" color="success">
            Register
          </Button>
          <FormHelperText sx={{ mt: 3 }}>
            Already have an account? <Link to="/login">Login</Link>
          </FormHelperText>
        </FormControl>
      </form>
    </>
  );
}

export default Register;
