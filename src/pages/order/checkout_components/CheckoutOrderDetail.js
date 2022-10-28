import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import currency from "currency.js";
import { Box, IconButton, Toolbar } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

function CheckoutOrderDetail({ orderDetail }) {
  return (
    <>
      <Card sx={{ padding: 1 }}>
        <Toolbar>
          <CardMedia
            component="img"
            sx={{ objectFit: "contain", width: "180px", height: "180px" }}
            image={orderDetail?.Product?.imageUrl}
          />
          <Box
            sx={{
              height: "180px",
            }}>
            <CardHeader
              titleTypographyProps={{
                fontWeight: "bold",
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
            <CardContent
              sx={{ padding: 0, display: "flex", flexDirection: "column", alignItems: "start" }}>
              <Typography variant="body2" color="text.secondary"></Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton>
                <RemoveIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {orderDetail?.productQuantity} in cart
              </Typography>
              <IconButton>
                <AddIcon />
              </IconButton>
            </CardActions>
          </Box>
        </Toolbar>
      </Card>
    </>
  );
}

export default CheckoutOrderDetail;
