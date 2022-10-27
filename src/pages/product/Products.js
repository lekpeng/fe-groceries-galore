import { useEffect, useState } from "react";
import ProductCard from "./product_components/ProductCard";
import productApis from "../../apis/product";
import { toast } from "react-hot-toast";
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
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default Products;
