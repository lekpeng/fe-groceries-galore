import { Box } from "@mui/material";
import CheckoutOrderDetail from "./CheckoutOrderDetail";

function CheckoutOrderCard({ order }) {
  return (
    <Box sx={{ border: 1, borderColor: "#c1bfbf96", mb: 3 }}>
      <h2>From {order?.Merchant?.name}</h2>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 0.7 }}>
          {order?.OrderDetails.map((orderDetail) => (
            <>
              <CheckoutOrderDetail key={orderDetail.id} orderDetail={orderDetail} />
            </>
          ))}
        </Box>
      </Box>
      <Box sx={{ flex: 0.3 }}></Box>
    </Box>
  );
}

export default CheckoutOrderCard;
