import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import currency from "currency.js";
import { Box, Toolbar } from "@mui/material";
import ProductCounter from "../../../components/product_counter.js/ProductCounter";
import { forwardRef } from "react";

const CheckoutOrderDetail = forwardRef(({ orderDetail }, ref) => {
  return (
    <div ref={ref}>
      <Card sx={{ padding: 1 }}>
        <Toolbar>
          <CardMedia
            component="img"
            sx={{ objectFit: "contain", width: "120px", height: "120px" }}
            image={orderDetail?.Product?.imageUrl}
          />
          <Box
            sx={{
              height: "120px",
            }}>
            <CardHeader
              titleTypographyProps={{
                fontWeight: "bold",
                textAlign: "left",
                fontSize: 18,
              }}
              subheaderTypographyProps={{
                fontWeight: "bold",
                fontSize: 14,
                textAlign: "left",
                color: "black",
              }}
              title={orderDetail?.Product?.name}
              subheader={currency(orderDetail?.productPrice).format()}
              sx={{ padding: 0 }}
            />
            <CardContent sx={{ padding: 0, display: "flex", flexDirection: "column", alignItems: "start" }}>
              <Typography variant="body2" color="text.secondary"></Typography>
            </CardContent>
            <CardActions disableSpacing>
              <ProductCounter
                product={orderDetail?.Product}
                customerProductQuantity={orderDetail?.productQuantity}></ProductCounter>
            </CardActions>
          </Box>
        </Toolbar>
      </Card>
    </div>
  );
});

export default CheckoutOrderDetail;
