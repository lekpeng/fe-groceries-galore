import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function CustomerOnlyComp() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const enterCustomerOnlyRoute = async () => {
      try {
        const response = await axiosPrivate.get("/users/customers-only");
        console.log(response.data);
      } catch (err) {
        console.log("err in cust comp", err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    enterCustomerOnlyRoute();
  }, []);

  return (
    <div>
      <h1>CustomerOnlyComp</h1>
    </div>
  );
}

export default CustomerOnlyComp;
