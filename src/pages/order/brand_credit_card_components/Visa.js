import "./Visa.css";
import CardDetails from "./CardDetails";

function Visa({ method }) {
  return (
    <div className="credit-card visa selectable">
      <CardDetails method={method} />
    </div>
  );
}

export default Visa;
