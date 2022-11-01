import { useEffect, useState } from "react";
import ProductCard from "./product_components/ProductCard";
import productApis from "../../apis/product";
import { toast } from "react-hot-toast";
import { Grid } from "@mui/material";
import ProductSkeleton from "./product_components/ProductSkeleton";
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
  const arrOf10 = new Array(12).fill();
  return (
    <>
      <h1>All Products</h1>
      <Grid container spacing={4}>
        {products.length ? (
          <>
            {products?.map((product) => (
              <Grid key={product.id} item xs={4}>
                <ProductCard key={product.id} product={product} />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {arrOf10.map((val, idx) => (
              <Grid key={idx} item xs={4}>
                <ProductSkeleton />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}

export default Products;
