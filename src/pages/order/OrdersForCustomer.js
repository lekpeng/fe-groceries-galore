import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderBriefCard from "./order_components/OrderBriefCard";

function OrdersForCustomer() {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const indexOrders = async () => {
      try {
        const response = await axiosPrivate.get("/orders");
        setOrders(response.data.orders);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    indexOrders();
  }, []);
  return (
    <>
      <h1>Orders</h1>
      <Grid container spacing={4}>
        {orders?.map((order) => (
          <Grid key={order.id} item xs={4}>
            <OrderBriefCard key={order.id} order={order} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default OrdersForCustomer;
