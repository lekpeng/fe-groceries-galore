import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderCard from "./order_components/OrderCard";

function Orders() {
  const { auth, setAuth } = useAuth();
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const indexOrders = async () => {
      try {
        const response = await axiosPrivate.get("/orders");
        console.log("response fr FE", response);
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
            <OrderCard key={order.id} order={order} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Orders;
