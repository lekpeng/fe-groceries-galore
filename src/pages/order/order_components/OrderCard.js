import { Box } from "@mui/material";
import OrderDetail from "./OrderDetail";

function OrderCard({ order }) {
  return (
    <Box>
      <h1>Order #{order?.id}</h1>
      {order?.OrderDetails.map((orderDetail) => (
        <OrderDetail key={orderDetail.id} orderDetail={orderDetail} />
      ))}
    </Box>
  );
}

export default OrderCard;
