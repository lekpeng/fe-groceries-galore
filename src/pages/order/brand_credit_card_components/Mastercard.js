import "./Mastercard.css";
import CardDetails from "./CardDetails";

function Mastercard({ method }) {
  return (
    <div className="credit-card mastercard selectable">
      <CardDetails method={method} />
    </div>
  );
}

export default Mastercard;
