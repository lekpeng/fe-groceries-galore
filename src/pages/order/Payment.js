import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useStateValue from "../../hooks/useStateValue";
import CheckoutOrderCard from "./checkout_components/CheckoutOrderCard";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import userApis from "../../apis/user";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import currency from "currency.js";
import { getCartAmountPayable } from "../../selectors/CartSelector";
import SavedCards from "./payment_components/SavedCards";
import ToggleNewPaymentMethod from "./payment_components/ToggleNewPaymentMethod";
import NewCardForm from "./payment_components/NewCardForm";

function Payment() {
  const [{ cart }, dispatch] = useStateValue();

  const { auth, setAuth } = useAuth();
  const [profile, setProfile] = useState({});

  const axiosPrivate = useAxiosPrivate();

  const [clientSecret, setClientSecret] = useState(null);
  const [newPaymentMethod, setNewPaymentMethod] = useState(true);
  const [pastPaymentMethods, setPastPaymentMethods] = useState([]);

  const messageOnOutOfStockProducts = (products) => {
    const removedProducts = products.map((product) => product.name).join(", ");
    if (products.length === 1) {
      return `${removedProducts} has been removed from your cart as it is out of stock.`;
    } else {
      return `${removedProducts} have been removed from your cart as they are out of stock.`;
    }
  };

  const checkCart = async () => {
    try {
      const response = await axiosPrivate.put("/orders/cart/update-based-on-stock");
      const { removedProducts, updatedCart } = response.data;

      if (removedProducts.length) {
        dispatch({
          type: "SET_CART",
          cart: updatedCart,
        });

        toast(messageOnOutOfStockProducts(removedProducts), {
          icon: "🙇🏻‍♀️",
        });
      }
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };
  useEffect(() => {
    const showProfile = async () => {
      if (auth.user) {
        try {
          const response = await userApis.showProfile(auth.user);
          setProfile(response?.data?.userProfile);
        } catch (err) {
          toast.error(err?.response?.data?.error);
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
          orderIds: cart.map((order) => order.id),
        });
        setClientSecret(response?.data?.clientSecret);
        setPastPaymentMethods(response?.data?.paymentMethods);
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    };
    const configurePayment = async () => {
      try {
        await checkCart();
        await getClientSecret();
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    };
    if (cart.length) {
      configurePayment();
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
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 5 }}>
            <Typography sx={{ mr: 10 }} fontWeight="bold" textAlign="left">
              Total: {currency(getCartAmountPayable(cart)).format()}
            </Typography>

            {pastPaymentMethods.length > 0 && <ToggleNewPaymentMethod setNewPaymentMethod={setNewPaymentMethod} />}
          </Box>

          {newPaymentMethod ? (
            <NewCardForm clientSecret={clientSecret} />
          ) : (
            <Box>
              <Typography sx={{ mb: 2 }}>Select a card</Typography>
              <SavedCards clientSecret={clientSecret} paymentMethods={pastPaymentMethods} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Payment;
