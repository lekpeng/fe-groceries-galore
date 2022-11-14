import { useEffect, useState } from "react";
import ProductCard from "./product_components/ProductCard";
import productApis from "../../apis/product";
import { toast } from "react-hot-toast";
import { Grid, Typography } from "@mui/material";
import ProductSkeleton from "./product_components/ProductSkeleton";
import { useParams } from "react-router-dom";
import { Link, Breadcrumbs } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import productCategoryApis from "../../apis/product_category";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    const getProductCategories = async () => {
      try {
        const response = await productCategoryApis.indexProductCategories();
        setCategories(response?.data?.productCategories);
      } catch (err) {
        toast.err(err?.response?.data?.error);
      }
    };
    getProductCategories();
  }, []);

  useEffect(() => {
    const indexProducts = async () => {
      try {
        if (params.productCategoryName) {
          const response = await productApis.indexProductsByCategory(params.productCategoryName);
          setProducts(response?.data?.products);
        } else {
          const response = await productApis.indexProducts();
          setProducts(response?.data?.products);
        }
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    };

    indexProducts();
  }, [params.productCategoryName]);
  const arrOf12 = new Array(12).fill();
  return (
    <>
      <Breadcrumbs sx={{ mb: 5 }}>
        {categories?.map((category) => (
          <Link
            component={RouterLink}
            to={`/products/category/${category?.name}`}
            key={category?.id}
            underline="hover"
            color="inherit">
            {category?.name}
          </Link>
        ))}
      </Breadcrumbs>
      <h1 style={{ marginBottom: "40px" }}>{params.productCategoryName ? params.productCategoryName : "All Groceries"}</h1>

      {isLoading ? (
        <Grid container spacing={4}>
          {arrOf12.map((val, idx) => (
            <Grid key={idx} item xs={4}>
              <ProductSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : products.length ? (
        <Grid container spacing={4}>
          {products?.map((product) => (
            <Grid key={product.id} item xs={4}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Typography variant="h6">No products for this category yet!</Typography>
        </>
      )}
    </>
  );
}

export default Products;
