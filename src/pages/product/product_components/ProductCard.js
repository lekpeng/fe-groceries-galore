import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Avatar } from "@mui/material";

function ProductCard({ product }) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Typography sx={{ fontSize: 8, textAlign: "right", pr: 2, pt: 2 }}>
          {product.ProductCategory.name}
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
          avatar={
            <Avatar sx={{ background: "#063970", fontSize: "10px", marginRight: "10px" }}>
              {product.Merchant.name}
            </Avatar>
          }
          title={product.name}
          subheader={product.description}
        />
        <CardMedia component="img" height="194" image={product.imageUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.ProductCategory.name}
          </Typography>
          <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
export default ProductCard;
