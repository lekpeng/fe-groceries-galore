import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

function AuthNeeded() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/register");
  };

  return (
    <>
      <div>AuthNeeded</div>
      <Link to="/customer-only">Customer only</Link>
      <Link to="/merchant-only">Merchant only</Link>
      <Link to="/auth-needed">Both</Link>

      <Button onClick={logout}>Log Out</Button>
    </>
  );
}

export default AuthNeeded;
