import { Box } from "@mui/material";
import CreditCard from "./CreditCard";

function SavedCards({ paymentMethods }) {
  console.log("PAYMENT METHODS", paymentMethods);
  return (
    <Box display="flex" flex-wrap="wrap">
      {paymentMethods?.map((method) => (
        <CreditCard method={method} brand={method?.card?.brand} />
      ))}
    </Box>
  );
}

export default SavedCards;
