import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useStateValue from "../../hooks/useStateValue";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CheckoutOrderCard from "./checkout_components/CheckoutOrderCard";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import userApis from "../../apis/user";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import currency from "currency.js";
import { getCartAmountPayable } from "../../reducers/CartSelector";

function Payment() {
  const navigate = useNavigate();
  const [{ cart }, dispatch] = useStateValue();

  const { auth, setAuth } = useAuth();
  const [profile, setProfile] = useState({});

  const axiosPrivate = useAxiosPrivate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

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

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axiosPrivate.post("/orders/payments/intent/new", {
          total: currency(getCartAmountPayable(cart)).multiply(100).value,
        });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    if (cart.length) {
      getClientSecret();
    }
  }, [cart]);

  if (!cart.length) {
    return (
      <>
        <Typography variant="h5">There is nothing in your cart!</Typography>
        <Button component={Link} to="/products">
          Add some products
        </Button>
      </>
    );
  }

  const handleChange = (ev) => {
    setDisabled(ev.empty || ev.error);
    setError(ev.error ? ev.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    try {
      if (!clientSecret) {
        toast.error("There is something wrong with our server's connection to Stripe.");
        return;
      }
      const stripeResponse = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      if (stripeResponse.error) {
        toast.error(`${stripeResponse.error.message} \nPlease try a different card.`);
        setProcessing(false);
        return;
      }

      setSucceeded(true);
      setError(null);
      setProcessing(false);
    } catch (err) {
      toast.error(err.message);
    }

    try {
      // make api call to update order after payment succeeded and set cart
      await axiosPrivate.patch("/orders/payments/confirm", {});

      await dispatch({
        type: "SET_CART",
        cart: [],
      });

      navigate("/orders");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", p: 3, borderBottom: "1px solid lightgray" }}>
        <Box sx={{ flex: 0.2 }}>
          <Typography textAlign="left" variant="h6" fontWeight="bold">
            Delivery Address
          </Typography>
        </Box>
        <Box sx={{ flex: 0.8 }}>
          <Typography textAlign="left">{profile?.address}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", p: 3, borderBottom: "1px solid lightgray" }}>
        <Box sx={{ flex: 0.2 }}>
          <Typography textAlign="left" variant="h6" fontWeight="bold">
            Review items
          </Typography>
        </Box>
        <Box sx={{ flex: 0.8 }}>
          {cart?.map((order) => (
            <CheckoutOrderCard key={order?.id} order={order} />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", p: 3, pb: 10 }}>
        <Box sx={{ flex: 0.2 }}>
          <Typography textAlign="left" variant="h6" fontWeight="bold">
            Payment Method
          </Typography>
        </Box>
        <Box sx={{ flex: 0.8 }}>
          <form style={{ maxWidth: "400px" }} onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />

            <Box>
              <Typography sx={{ mt: 2, mb: 2 }} fontWeight="bold" textAlign="left">
                Total: {currency(getCartAmountPayable(cart)).format()}
              </Typography>
              {error && (
                <Typography fontSize="14px" color="red" alignText="left">
                  {error}
                </Typography>
              )}

              <Button type="submit" disabled={processing || disabled || succeeded}>
                <span>{processing ? "Processing" : "Make payment"}</span>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Payment;
