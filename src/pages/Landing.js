import { Link } from "react-router-dom";

function Landing() {
  // to render differently based on auth state and role

  // TODO:
  // Landing: customer logged in, redirect to /products
  //          merchant logged in, redirect to /orders
  //          logged out, redirect to /login

  return (
    <>
      <div>Landing</div>
      <Link to="/customer-only">Customer only</Link>
      <Link to="/merchant-only">Merchant only</Link>
      <Link to="/auth-needed">Both</Link>
    </>
  );
}

export default Landing;
