import { Container } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Confirmation() {
  const params = useParams();
  const navigate = useNavigate();
  const userName = jwt_decode(params.emailToken).data.name;

  setTimeout(() => {
    navigate("/login");
  }, 5000);

  // todo: upon landing send api request to make isConfirmed true.
  return (
    <Container>
      <h1>Welcome to Groceries Galore {userName}!</h1>
      <p>User verification was a success ✔</p>
      <p>You will be automatically redirected to login after 5 seconds.</p>
      <p>
        If that does not happen, please click <Link to="/login">HERE!</Link>.
      </p>
    </Container>
  );
}

export default Confirmation;
