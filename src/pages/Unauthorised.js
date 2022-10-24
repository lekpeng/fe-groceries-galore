import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Unauthorised = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>Unauthorised</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div>
        <button onClick={goBack}>Go Back</button>
      </div>
      <Link to="/customer-only">Customer only</Link>
      <Link to="/merchant-only">Merchant only</Link>
      <Link to="/auth-needed">Both</Link>
    </section>
  );
};

export default Unauthorised;
