import { useNavigate } from "react-router-dom";
import useStateValue from "../../../hooks/useStateValue";
import { Box, Button, Typography } from "@mui/material";
import {
  getOrderAmountPayable,
  getOrderQuantity,
  getCartAmountPayable,
  getCartQuantity,
} from "../../../reducers/CartSelector";
import currency from "currency.js";
import { useState } from "react";

function AmountPayable() {
  const navigate = useNavigate();
  const [{ cart }, dispatch] = useStateValue();

  return (
    <Box sx={{ border: 1, borderColor: "#c1bfbf96", mb: 3, padding: 2 }}>
      <Typography fontWeight="bold" variant="h6" sx={{ mb: 2 }}>
        Order Summary
      </Typography>
      {cart?.map((order) => (
        <Box key={order.id}>
          <Typography variant="body1" textAlign="left">
            Subtotal from {order?.Merchant?.name} ({getOrderQuantity(order)} items)
          </Typography>
          <Typography sx={{ mb: 1 }} fontWeight="bold" textAlign="left">
            {currency(getOrderAmountPayable(order)).format()}
          </Typography>
        </Box>
      ))}
      <Typography variant="body1" textAlign="left">
        Order Total: ({getCartQuantity(cart)} items)
      </Typography>
      <Typography sx={{ mb: 1 }} fontWeight="bold" textAlign="left">
        {currency(getCartAmountPayable(cart)).format()}
      </Typography>

      <Button onClick={(e) => navigate("/payment")}>Proceed to Checkout</Button>
    </Box>
  );
}

export default AmountPayable;
