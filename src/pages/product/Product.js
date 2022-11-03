import { useEffect, useState } from "react";
import ProductCard from "./product_components/ProductCard";
import productApis from "../../apis/product";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
function Product() {
  const [product, setProduct] = useState({});
  const params = useParams();
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
  }, [params]);

  return (
    <>
      <Box sx={{ width: "345px", margin: "auto" }}>
        <ProductCard key={product.id} product={product} />
      </Box>
    </>
  );
}

export default Product;
