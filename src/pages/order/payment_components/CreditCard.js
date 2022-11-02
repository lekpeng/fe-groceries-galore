import { useState } from "react";
import Amex from "../brand_credit_card_components/Amex";
import Mastercard from "../brand_credit_card_components/Mastercard";
import Visa from "../brand_credit_card_components/Visa";
import "./CreditCard.css";

function CreditCard({ style, idx, method, cardsSelectionStatuses, setCardsSelectionStatuses }) {
  let card;

  const handleClick = () => {
    const prevIdxSelected = cardsSelectionStatuses.findIndex((elm) => elm === true);
    console.log("PREV IDX", prevIdxSelected);
    setCardsSelectionStatuses((prev) => {
      const curr = [...prev];
      if (curr[idx] === true) {
        return curr;
      }
      curr[prevIdxSelected] = false;
      curr[idx] = true;
      return curr;
    });
  };

  if (method?.card?.brand === "amex") {
    card = <Amex method={method} />;
  } else if (method?.card?.brand === "visa") {
    card = <Visa method={method} />;
  } else if (method?.card?.brand === "mastercard") {
    card = <Mastercard method={method} />;
  }
  return (
    <>
      <div onClick={handleClick} style={style}>
        {card}
      </div>
    </>
  );
}

export default CreditCard;
