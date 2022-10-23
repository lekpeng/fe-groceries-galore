import EyeAdornment from "../components/EyeAdornment";
import ToggleRole from "../components/ToggleRole";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { Button, Container, FormControl, FormHelperText, TextField } from "@mui/material";
import userApis from "../utils/apis/user";
import toast from "react-hot-toast";

function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const [userType, setUserType] = useState("Customer");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApis.auth(formData, userType, "login");

      const accessToken = response.data.accessToken;

      setAuth({ email: formData.email, userType, accessToken });
      navigate("/home");

      toast.success("Welcome back 😄");
    } catch (err) {
      toast.error("Error: " + err.response?.data?.error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container>
      <h1>Login</h1>
      <ToggleRole setUserType={setUserType} />
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 10 }}>
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
            type={isPasswordVisible ? "input" : "password"}
            sx={{ mt: 3 }}
            label="Password"
            onChange={handleChange}
            InputProps={{
              endAdornment: <EyeAdornment />,
            }}
            inputProps={{
              minLength: 8,
              maxLength: 16,
            }}
          />

          <Button type="submit" sx={{ mt: 3 }} variant="contained" color="success">
            Login
          </Button>
          <FormHelperText sx={{ mt: 3 }}>
            Need an account? <Link to="/register">Sign up</Link>
          </FormHelperText>
        </FormControl>
      </form>
    </Container>
  );
}

export default Login;
