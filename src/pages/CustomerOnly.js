import { Link } from "react-router-dom";
import CustomerOnlyComp from "../components/CustomerOnlyComp";

function CustomerOnly() {
  return (
    <>
      <div>CustomerOnly</div>
      <CustomerOnlyComp />
      <Link to="/customer-only">Customer only</Link>
      <Link to="/merchant-only">Merchant only</Link>
      <Link to="/auth-needed">Both</Link>
    </>
  );
}

export default CustomerOnly;
