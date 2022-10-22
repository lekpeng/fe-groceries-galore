import EyeAdornment from "../components/EyeAdornment";
import ToggleRole from "../components/ToggleRole";
import { Button, Container, FormControl, TextField } from "@mui/material";
import { useState } from "react";

function Login() {
  const [userType, setUserType] = useState("Customer");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = () => {};
  const handleSubmit = () => {};

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

export default Login;
