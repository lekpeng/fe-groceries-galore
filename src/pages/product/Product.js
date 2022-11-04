import { useEffect, useState } from "react";
import ProductCard from "./product_components/ProductCard";
import productApis from "../../apis/product";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";
function Product() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const { auth } = useAuth();
  useEffect(() => {
    const showProduct = async () => {
      try {
        const response = await productApis.showProduct(params.productId);
        setProduct(response.data.product);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    showProduct();
  }, [params.productId]);

  return (
    <Box sx={{ width: "345px", margin: "auto" }}>
      {auth?.user?.userType === "Merchant" && auth?.user?.email === product?.Merchant?.email ? (
        <Box sx={{ mb: 3 }}>
          <Button variant="outlined">Edit</Button>{" "}
          <Button color="error" variant="outlined">
            Delete
          </Button>
        </Box>
      ) : (
        <></>
      )}
      <ProductCard key={product.id} product={product} />
    </Box>
  );
}

export default Product;
