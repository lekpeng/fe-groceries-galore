import React from "react";
import useAuth from "../../hooks/useAuth";
import OrdersForCustomer from "./OrdersForCustomer";
import OrdersForMerchant from "./OrdersForMerchant";

function Orders() {
  const { auth } = useAuth();
  return <>{auth?.user?.userType === "Customer" ? <OrdersForCustomer /> : <OrdersForMerchant />}</>;
}

export default Orders;
