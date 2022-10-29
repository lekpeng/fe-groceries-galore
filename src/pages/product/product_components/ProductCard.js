import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ColoredAvatar from "../../../components/avatar/ColoredAvatar";

function ProductCard({ product }) {
  return (
    <Card sx={{ border: 1, borderColor: "#c1bfbf96" }}>
      <Typography sx={{ fontSize: 8, textAlign: "right", pr: 2, pt: 2 }}>
        {product.ProductCategory?.name}
      </Typography>
      <CardHeader
        sx={{ pt: 0, pr: 2, pl: 2, pb: 2 }}
        titleTypographyProps={{
          fontWeight: "bold",
          fontSize: 13,
        }}
        subheaderTypographyProps={{
          fontSize: 11,
        }}
        avatar={<ColoredAvatar name={product.Merchant?.name} size={"40px"} fontSize={"12px"} />}
        title={product?.name}
        subheader={product?.description}
      />
      <CardMedia component="img" height="194" image={product.imageUrl} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {product.ProductCategory?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
}
export default ProductCard;
