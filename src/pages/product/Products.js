import { useEffect, useState } from "react";
import ProductCard from "./product_components/ProductCard";
import productApis from "../../apis/product";
import { toast } from "react-hot-toast";
import { Grid } from "@mui/material";
function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const indexProducts = async () => {
      try {
        const response = await productApis.indexProducts();
        setProducts(response.data.products);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    indexProducts();
  }, []);
  return (
    <>
      <h1>All Products</h1>
      <Grid container spacing={4}>
        {products?.map((product) => (
          <Grid key={product.id} item xs={4}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Products;
