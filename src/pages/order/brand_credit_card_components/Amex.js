import "./Amex.css";
import { getExpMonthInLength2String, getExpYearInLength2String } from "../../../selectors/CreditCardSelector";

function Amex({ method }) {
  return (
    <div class="credit-card amex selectable">
      <div class="credit-card-last4">{method?.card?.last4}</div>
      <div class="credit-card-expiry">
        {getExpMonthInLength2String(method?.card?.exp_month)}/{getExpYearInLength2String(method?.card?.exp_year)}
      </div>
    </div>
  );
}

export default Amex;
