import { Box } from "@mui/system";
import FlipMove from "react-flip-move";
import useStateValue from "../../hooks/useStateValue";
import CheckoutOrderCard from "./checkout_components/CheckoutOrderCard";
import AmountPayable from "./checkout_components/AmountPayable";

function Checkout() {
  const [{ cart }, dispatch] = useStateValue();
  return (
    <>
      <h1>Your Cart</h1>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 0.7 }}>
          {/* <FlipMove> */}
          {cart?.map((order) => (
            <CheckoutOrderCard key={order?.id} order={order} />
          ))}
          {/* </FlipMove> */}
        </Box>
        <Box sx={{ flex: 0.3 }}>
          <AmountPayable />
        </Box>
      </Box>
    </>
  );
}

export default Checkout;
