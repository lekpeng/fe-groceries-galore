import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ColoredAvatar from "../../../components/avatar/ColoredAvatar";
import { getProductQuantity } from "../../../selectors/CartSelector";
import useStateValue from "../../../hooks/useStateValue";
import ProductCounter from "../../../components/product_counter.js/ProductCounter";
import useAuth from "../../../hooks/useAuth";
import currency from "currency.js";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { auth, setAuth } = useAuth();
  const [{ cart }, dispatch] = useStateValue();

  const displayCardAction =
    product.quantity === 0 ? (
      <Typography sx={{ fontSize: "16px", fontWeight: "bold", color: "red", paddingTop: "8px", paddingBottom: "8px" }}>
        Out of Stock
      </Typography>
    ) : auth?.user?.userType === "Customer" ? (
      <ProductCounter product={product} customerProductQuantity={getProductQuantity(cart, product.id)}></ProductCounter>
    ) : auth?.user?.userType === "Merchant" && auth?.user?.email === product?.Merchant?.email ? (
      <Typography sx={{ height: "40px", fontSize: "15px" }}>{product.quantity} left</Typography>
    ) : (
      <Box sx={{ height: "40px" }}></Box>
    );

  return (
    <Card sx={{ border: 1, borderColor: "#c1bfbf96" }}>
      <Typography
        component={Link}
        to={`/products/category/${product.ProductCategory?.name}`}
        sx={{ fontSize: 8, textAlign: "right", p: 2 }}>
        {product.ProductCategory?.name}
      </Typography>
      <CardHeader
        sx={{ pt: 0, pr: 2, pl: 2, pb: 2 }}
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: 14,
          textAlign: "left",
          textDecoration: "none",
        }}
        subheaderTypographyProps={{
          fontSize: 12,
          textAlign: "left",
        }}
        avatar={<ColoredAvatar name={product.Merchant?.name} size={"40px"} fontSize={"12px"} />}
        title={
          <Link style={{ textDecoration: "none" }} className="productCard__link" to={`/products/${product?.id}`}>
            {product?.name}
          </Link>
        }
        subheader={product?.description}
      />
      <CardMedia component="img" height="180" sx={{ objectFit: "contain" }} image={product.imageUrl} />
      <CardContent sx={{ p: 0, mt: 1 }}>
        <Typography color="text.primary" sx={{ fontSize: "15px" }}>
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
