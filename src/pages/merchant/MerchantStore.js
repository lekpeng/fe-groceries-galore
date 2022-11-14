import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import productApis from "../../apis/product";
import useAuth from "../../hooks/useAuth";
import MerchantStoreForOthers from "./MerchantStoreForOthers";
import MerchantStoreForMerchant from "./MerchantStoreForMerchant";

function MerchantStore() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [merchant, setMerchant] = useState({});
  const { auth, setAuth } = useAuth();
  console.log("PARAMS", params);
  useEffect(() => {
    console.log("INSIDE USE EFFECT!!!!");
    const indexProductsByMerchant = async () => {
      try {
        const response = await productApis.indexProductsByMerchant(params.merchantId);
        console.log("RESPONSE", response);
        setProducts(response?.data?.products);
        setMerchant(response?.data?.merchant);
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    };
    indexProductsByMerchant();
  }, [params.merchantId]);
  // products/new => products/1

  return (
    <>
      {auth?.user?.userType === "Merchant" && auth?.user?.email === merchant?.email ? (
        <MerchantStoreForMerchant products={products} merchant={merchant} />
      ) : (
        <MerchantStoreForOthers products={products} merchant={merchant} />
      )}
    </>
  );
}

export default MerchantStore;
