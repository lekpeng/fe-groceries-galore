import Amex from "../brand_credit_card_components/Amex";
import Mastercard from "../brand_credit_card_components/Mastercard";
import Visa from "../brand_credit_card_components/Visa";
import "./CreditCard.css";

function CreditCard({ brand }) {
  if (brand === "Amex") {
    return <Amex />;
  } else if (brand === "Visa") {
    return <Visa />;
  }
  return <Mastercard />;
}

export default CreditCard;
