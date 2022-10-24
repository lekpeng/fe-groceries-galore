import { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function CustomerOnlyComp() {
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const enterCustomerOnlyRoute = async () => {
      try {
        const response = await axiosPrivate.get("/users/customers-only");
        console.log(response.data);
      } catch (err) {
        console.log("err in cust comp", err);
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
