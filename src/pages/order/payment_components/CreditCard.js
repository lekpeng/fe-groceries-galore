import Amex from "../brand_credit_card_components/Amex";
import Mastercard from "../brand_credit_card_components/Mastercard";
import Visa from "../brand_credit_card_components/Visa";
import "./CreditCard.css";

function CreditCard({ brand, method }) {
  let card;
  if (brand === "amex") {
    card = <Amex method={method} />;
  } else if (brand === "visa") {
    card = <Visa method={method} />;
  } else {
    card = <Mastercard method={method} />;
  }
  return <div onClick={() => console.log("HO")}>{card}</div>;
}

export default CreditCard;
