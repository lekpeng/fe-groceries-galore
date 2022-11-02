import { Box, Card, CardHeader } from "@mui/material";
import OrderDetail from "./OrderDetail";

function OrderCard({ order }) {
  return (
    <Box>
      <h3>
        Order #{order?.id}: {order?.Customer?.name}
      </h3>
      {order?.OrderDetails.map((orderDetail) => (
        <OrderDetail key={orderDetail.id} orderDetail={orderDetail} />
      ))}
    </Box>
  );
}

export default OrderCard;
