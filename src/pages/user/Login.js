import EyeAdornment from "./user_components/EyeAdornment";
import ToggleUserType from "./user_components/ToggleUserType";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, FormControl, FormHelperText, TextField } from "@mui/material";
import userApis from "../../apis/user";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useStateValue from "../../hooks/useStateValue";

function Login() {
  const { auth, setAuth } = useAuth();
  const [userType, setUserType] = useState("Customer");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [{ cart }, dispatch] = useStateValue();
  // if user came from somewhere, we navigate them back
  // let pageToNavigate = location.state?.from?.pathname;
  let pageToNavigate = null;

  if (!pageToNavigate) {
    userType === "Customer" ? (pageToNavigate = "/products") : (pageToNavigate = "/orders");
  }

  useEffect(() => {
    const initializeCart = async () => {
      const cartResponse = await axiosPrivate.get("/orders/cart");
      dispatch({
        type: "SET_CART",
        cart: cartResponse.data.orders,
      });
      toast.success("Welcome back 😄");
      navigate(pageToNavigate);
    };
    if (auth?.user?.userType === "Customer") {
      initializeCart();
    } else if (auth?.user?.userType === "Merchant") {
      navigate(pageToNavigate);
    }
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApis.auth(formData, userType, "login");
      const accessToken = response.data.accessToken;

      setAuth({ user: { email: formData.email, userType, accessToken } });
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleChange = (e) => {
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
      <h1>Login</h1>
      <ToggleUserType setUserType={setUserType} />
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ mt: 10 }}>
          <TextField required name="email" type="email" sx={{ mt: 3 }} label="Email" onChange={handleChange} />

          <TextField
            required
            name="password"
            type={isPasswordVisible ? "input" : "password"}
            sx={{ mt: 3 }}
            label="Password"
            onChange={handleChange}
            InputProps={{
              endAdornment: <EyeAdornment isPasswordVisible={isPasswordVisible} handleClick={handleClick} />,
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
    </>
  );
}

export default Login;
