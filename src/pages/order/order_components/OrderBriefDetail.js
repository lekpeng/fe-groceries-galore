import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import currency from "currency.js";

function OrderBriefDetail({ orderDetail }) {
  return (
    <>
      <Card sx={{ border: 1, borderColor: "#c1bfbf96" }}>
        <CardHeader
          sx={{ pt: 0, pr: 2, pl: 2, pb: 0 }}
          titleTypographyProps={{
            fontWeight: "bold",
            fontSize: 14,
          }}
          subheaderTypographyProps={{
            fontSize: 11,
          }}
          title={orderDetail?.Product?.name}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Price: {currency(orderDetail?.productPrice).format()}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Quantity: {orderDetail?.productQuantity}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </>
  );
}

export default OrderBriefDetail;
