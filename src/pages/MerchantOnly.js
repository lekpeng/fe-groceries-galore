import { Link } from "react-router-dom";

function MerchantOnly() {
  return (
    <>
      <div>MerchantOnly</div>
      <Link to="/customer-only">Customer only</Link>
      <Link to="/merchant-only">Merchant only</Link>
      <Link to="/auth-needed">Both</Link>
    </>
  );
}

export default MerchantOnly;
