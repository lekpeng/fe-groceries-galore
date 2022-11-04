import useAuth from "../../hooks/useAuth";
import OrdersForCustomers from "./OrdersForCustomers";
import OrdersForMerchants from "./OrdersForMerchants";

function Orders() {
  const { auth } = useAuth();
  return <>{auth?.user?.userType === "Customer" ? <OrdersForCustomers /> : <OrdersForMerchants />}</>;
}

export default Orders;
