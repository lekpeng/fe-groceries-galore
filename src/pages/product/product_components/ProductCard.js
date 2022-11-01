import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ColoredAvatar from "../../../components/avatar/ColoredAvatar";
import { getProductQuantity } from "../../../reducers/CartSelector";
import useStateValue from "../../../hooks/useStateValue";
import ProductCounter from "../../../components/product_counter.js/ProductCounter";
import useAuth from "../../../hooks/useAuth";
import currency from "currency.js";
import { Box } from "@mui/material";

function ProductCard({ product }) {
  const { auth, setAuth } = useAuth();
  const [{ cart }, dispatch] = useStateValue();

  const displayCardAction =
    product.quantity === 0 ? (
      <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "red", paddingTop: "8px", paddingBottom: "8px" }}>
        Out of Stock
      </Typography>
    ) : auth?.user ? (
      <ProductCounter product={product} customerProductQuantity={getProductQuantity(cart, product.id)}></ProductCounter>
    ) : (
      <Box sx={{ height: "40px" }}></Box>
    );

  return (
    <Card sx={{ border: 1, borderColor: "#c1bfbf96" }}>
      <Typography sx={{ fontSize: 8, textAlign: "right", p: 2 }}>{product.ProductCategory?.name}</Typography>
      <CardHeader
        sx={{ pt: 0, pr: 2, pl: 2, pb: 2 }}
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: 14,
          textAlign: "left",
        }}
        subheaderTypographyProps={{
          fontSize: 12,
          textAlign: "left",
        }}
        avatar={<ColoredAvatar name={product.Merchant?.name} size={"40px"} fontSize={"12px"} />}
        title={product?.name}
        subheader={product?.description}
      />
      <CardMedia component="img" height="194" sx={{ objectFit: "contain" }} image={product.imageUrl} />
      <CardContent sx={{ padding: "0" }}>
        <Typography variant="h6" color="text.primary" sx={{ fontSize: "15px" }}>
          {currency(product.price).format()}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }} disableSpacing>
        {displayCardAction}
      </CardActions>
    </Card>
  );
}
export default ProductCard;
