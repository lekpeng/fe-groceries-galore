import { Box, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import { capitaliseFirstLetter } from "../../../utils/capitalise_first_letter";
import { isoToYYYYMMDD } from "../../../utils/date_time";
import OrderDetail from "./OrderDetail";

function OrderCard({ order }) {
  const { auth } = useAuth();
  return (
    <Box>
      <Typography>{order?.paidAt && isoToYYYYMMDD(order?.paidAt)}</Typography>

      <Typography>
        {auth?.user.userType === "Customer"
          ? `Order #${order?.id}: ${order?.Merchant?.name}`
          : `Order #${order?.id}: ${order?.Customer?.name}`}
      </Typography>

      <Typography>Status: {order?.status && capitaliseFirstLetter(order?.status)}</Typography>

      {order?.OrderDetails.map((orderDetail) => (
        <OrderDetail key={orderDetail.id} orderDetail={orderDetail} />
      ))}
    </Box>
  );
}

export default OrderCard;
