import { Box } from "@mui/system";
import useStateValue from "../../hooks/useStateValue";
import CheckoutOrderCard from "./checkout_components/CheckoutOrderCard";
import AmountPayable from "./checkout_components/AmountPayable";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { axiosPrivate } from "../../apis/axios";
import toast from "react-hot-toast";

function Checkout() {
  const [{ cart }, dispatch] = useStateValue();

  const messageOnOutOfStockProducts = (products) => {
    const removedProducts = products.map((product) => product.name).join(", ");
    if (products.length === 1) {
      return `${removedProducts} has been removed from your cart as it is out of stock.`;
    } else {
      return `${removedProducts} have been removed from your cart as they are out of stock.`;
    }
  };

  useEffect(() => {
    console.log("---> current cart status", cart);

    // remove items that are out of stock and if any, notify user
    const checkCart = async () => {
      console.log("<-----CALLING CHECK CART--------->");
      try {
        const response = await axiosPrivate.put("/orders/cart/update-based-on-stock");
        const { removedProducts, updatedCart } = response.data;

        console.log("RESPONSE DATA FOR REMOVED PRODUCSTS", removedProducts);
        console.log("UPDATED CART", updatedCart);

        if (removedProducts.length) {
          await dispatch({
            type: "SET_CART",
            cart: updatedCart,
          });

          console.log("UPDATED CART IN CONTEXT", cart);

          toast(messageOnOutOfStockProducts(removedProducts), {
            icon: "🙇🏻‍♀️",
          });
        }
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };

    if (cart.length) {
      checkCart();
    }
  }, [cart]);

  if (!cart.length) {
    return (
      <>
        <h1>Your Cart</h1>
        <Typography variant="h5">There is nothing in your cart!</Typography>
        <Button component={Link} to="/products">
          Add some products
        </Button>
      </>
    );
  }
  return (
    <>
      <h1>Your Cart</h1>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 0.7 }}>
          {cart?.map((order) => (
            <CheckoutOrderCard key={order?.id} order={order} />
          ))}
        </Box>
        <Box sx={{ flex: 0.3 }}>
          <AmountPayable />
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
