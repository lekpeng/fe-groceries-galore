import "./Mastercard.css";
import CardDetails from "./CardDetails";

function Mastercard({ method }) {
  return (
    <div class="credit-card mastercard selectable">
      <CardDetails method={method} />
    </div>
  );
}

export default Mastercard;
