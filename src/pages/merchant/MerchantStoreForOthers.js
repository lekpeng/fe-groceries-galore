import { Grid } from "@mui/material";
import ProductCard from "../product/product_components/ProductCard";
import ProductSkeleton from "../product/product_components/ProductSkeleton";

function MerchantStoreForOthers({ products, merchant }) {
  const arrOf12 = new Array(12).fill();

  return (
    <>
      <h1>{merchant?.name}</h1>
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
            {arrOf12.map((val, idx) => (
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

export default MerchantStoreForOthers;
