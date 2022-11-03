import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import productApis from "../../apis/product";
import useAuth from "../../hooks/useAuth";
import ProductCard from "../product/product_components/ProductCard";
import ProductSkeleton from "../product/product_components/ProductSkeleton";

function Merchant() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [merchant, setMerchant] = useState({});
  const { auth } = useAuth();
  useEffect(() => {
    const indexProductsByMerchant = async () => {
      try {
        const response = await productApis.indexProductsByMerchant(params.merchantId);
        setProducts(response.data.products);
        setMerchant(response.data.merchant);
      } catch (err) {
        toast.error(err.response.data.error);
      }
    };
    indexProductsByMerchant();
  }, [params.merchantId]);

  const arrOf12 = new Array(12).fill();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <h1>Groceries from {merchant?.name}</h1>
        </Grid>
        <Grid item xs={2}>
          {merchant?.email === auth?.user?.email ? <Button>Add Product</Button> : <></>}
        </Grid>
      </Grid>
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

export default Merchant;
