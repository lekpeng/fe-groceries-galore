import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { capitaliseFirstLetter } from "../../../utils/capitalise_first_letter";
import { isoToYYYYMMDD } from "../../../utils/date_time";
import OrderBriefDetail from "./OrderBriefDetail";
import UpdateOrderStatus from "./UpdateOrderStatus";

function OrderBriefCard({ order }) {
  const { auth } = useAuth();

  return (
    <Box>
      <Typography>{order?.paidAt && isoToYYYYMMDD(order?.paidAt)}</Typography>
      <Typography component={Link} to={`/orders/${order.id}`}>
        {auth?.user.userType === "Customer"
          ? `Order #${order?.id}: ${order?.Merchant?.name}`
          : `Order #${order?.id}: ${order?.Customer?.name}`}
      </Typography>
      {auth?.user.userType === "Customer" ? (
        <Typography>Status: {order?.status && capitaliseFirstLetter(order?.status)}</Typography>
      ) : (
        <UpdateOrderStatus orderId={order?.id} currStatus={order?.status} />
      )}

      {order?.OrderDetails.map((orderDetail) => (
        <OrderBriefDetail key={orderDetail.id} orderDetail={orderDetail} />
      ))}
    </Box>
  );
}

export default OrderBriefCard;
