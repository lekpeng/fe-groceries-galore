import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderCard from "./order_components/OrderCard";

function Order() {
  const params = useParams();
  const orderId = params.orderId;
  const [order, setOrder] = useState();
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const showOrder = async () => {
      try {
        const response = await axiosPrivate.get(`/orders/${orderId}`);
        console.log("SHOW ORDER", response);
        setOrder(response.data.order);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    showOrder();
  }, []);
  return <OrderCard order={order} />;
}

export default Order;
