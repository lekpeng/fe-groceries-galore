import { Container, FormControl, FormHelperText, TextField, Button } from "@mui/material";
import ToggleRole from "../components/ToggleRole";

function Register() {
  return (
    <Container>
      <h1>Register</h1>
      <ToggleRole />
      <FormControl sx={{ mt: 10 }}>
        <TextField required label="Name" />
        <TextField required type="email" sx={{ mt: 3 }} label="Email" />
        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

        <TextField required type="password" sx={{ mt: 3 }} label="Password" />
        <TextField required type="password" sx={{ mt: 3 }} label="Password again" />
        <Button sx={{ mt: 3 }} variant="contained" color="success">
          Register
        </Button>
      </FormControl>
    </Container>
  );
}

export default Register;
