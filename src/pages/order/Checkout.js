import { Box } from "@mui/system";
import useStateValue from "../../hooks/useStateValue";
import CheckoutOrderCard from "./checkout_components/CheckoutOrderCard";
import AmountPayable from "./checkout_components/AmountPayable";

function Checkout() {
  const [{ cart }, dispatch] = useStateValue();
  // on load remove items that are out of stock
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
