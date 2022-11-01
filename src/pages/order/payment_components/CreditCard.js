import Amex from "../brand_credit_card_components/Amex";
import Mastercard from "../brand_credit_card_components/Mastercard";
import Visa from "../brand_credit_card_components/Visa";
import "./CreditCard.css";

function CreditCard({ brand, method }) {
  if (brand === "amex") {
    return <Amex method={method} />;
  } else if (brand === "visa") {
    return <Visa method={method} />;
  }
  return <Mastercard method={method} />;
}

export default CreditCard;
