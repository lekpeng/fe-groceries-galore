import { Box, Card, CardHeader } from "@mui/material";
import ColoredAvatar from "../../../components/avatar/ColoredAvatar";
import CheckoutOrderDetail from "./CheckoutOrderDetail";
import FlipMove from "react-flip-move";

function CheckoutOrderCard({ order }) {
  return (
    <Box sx={{ border: 1, borderColor: "#c1bfbf96", mb: 3 }}>
      <Card>
        <CardHeader
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: "22px",
          }}
          avatar={<ColoredAvatar name={order?.Merchant?.name} size={"40px"} fontSize={"12px"} />}
          title={order?.Merchant?.name}
          sx={{ width: "200px", margin: "0 auto" }}
        />
      </Card>
      <Box sx={{ flex: 0.7 }}>
        <FlipMove>
          {order?.OrderDetails.map((orderDetail) => (
            <CheckoutOrderDetail key={orderDetail.id} orderDetail={orderDetail} />
          ))}
        </FlipMove>
      </Box>
    </Box>
  );
}

export default CheckoutOrderCard;
