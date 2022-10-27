import { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import logo from "../../images/logo.png";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAuth from "../../hooks/useAuth";
import userApis from "../../apis/user";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Header = () => {
  // const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const { auth, setAuth } = useAuth();
  const [profile, setProfile] = useState(null);

  const isLoggedIn = !!auth?.user;
  const navigate = useNavigate();

  useEffect(() => {
    const showProfile = async () => {
      if (auth.user) {
        try {
          const response = await userApis.showProfile(auth.user);
          setProfile(response.data.userProfile);
        } catch (err) {
          toast.error(err.response.data.error);
        }
      }
    };

    showProfile();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await userApis.logout();
      setAuth({});
      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <AppBar sx={{ background: "#063970", mb: "4rem" }}>
      <Toolbar sx={{ height: "60px", justifyContent: "space-between" }}>
        <Toolbar sx={{ height: "100%" }}>
          <Box
            component="img"
            sx={{
              height: "80%",
            }}
            src={logo}
          />
          <Typography sx={{ fontSize: "1.5rem" }}>Groceries Galore</Typography>
        </Toolbar>
        <SearchBar />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}>
              <Typography>{`Hello ${profile?.name},`}</Typography>
              <Typography>Logout</Typography>
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}>
              <Typography>Hello Guest,</Typography>
              <Typography>Login</Typography>
            </Button>
          )}
          <Button
            component={Link}
            to="/merchants"
            sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}>
            <Typography>Our</Typography>
            <Typography>Merchants</Typography>
          </Button>

          <Button
            component={Link}
            to="/orders"
            sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}>
            <Typography>Orders</Typography>
            <Typography>& Returns</Typography>
          </Button>

          <Button
            component={Link}
            to="/checkout"
            sx={{ my: 2, color: "white", display: "block", textTransform: "none" }}>
            <ShoppingCartIcon fontSize={"medium"} />
            <Typography>No of items</Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;