import "./Amex.css";
import CardDetails from "./CardDetails";

function Amex({ method }) {
  return (
    <div className="credit-card amex selectable">
      <CardDetails method={method} />
    </div>
  );
}

export default Amex;
