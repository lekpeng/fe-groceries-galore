import { Box } from "@mui/material";
import CreditCard from "./CreditCard";

function SavedCards() {
  return (
    <Box display="flex" flex-wrap="wrap">
      <CreditCard brand="Amex" />
      <CreditCard brand="Visa" />
      <CreditCard brand="Mastercard" />
    </Box>
  );
}

export default SavedCards;
