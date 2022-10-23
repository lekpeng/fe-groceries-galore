import { Container } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import userApis from "../utils/apis/user";
import toast from "react-hot-toast";

function Confirmation() {
  const params = useParams();
  const navigate = useNavigate();
  const userName = jwt_decode(params.emailToken).user.name;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await userApis.confirm(params.emailToken);
      } catch (err) {
        toast.error(err.response.data.error);
      }

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    };

    verifyUser();
  }, []);

  // todo: upon landing send api request to make isConfirmed true.
  return (
    <Container>
      <h1>Welcome to Groceries Galore, {userName}!</h1>
      <p>User verification was a success ✔</p>
      <p>You will be automatically redirected to login after 5 seconds.</p>
      <p>
        If that does not happen, please click <Link to="/login">HERE!</Link>.
      </p>
    </Container>
  );
}

export default Confirmation;
