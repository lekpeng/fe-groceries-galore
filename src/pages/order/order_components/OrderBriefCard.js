import { Box, Card, CardHeader, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import OrderDetail from "./OrderDetail";

function OrderBriefCard({ order }) {
  return (
    <Box>
      <Typography component={Link} to={`/orders/${order.id}`}>
        Order #{order?.id}: {order?.Customer?.name}
      </Typography>
      {order?.OrderDetails.map((orderDetail) => (
        <OrderDetail key={orderDetail.id} orderDetail={orderDetail} />
      ))}
    </Box>
  );
}

export default OrderBriefCard;
