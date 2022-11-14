import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import userApis from "../../apis/user";
import MerchantCard from "./merchant_components/MerchantCard";

function Merchants() {
  const [merchants, setMerchants] = useState([]);
  useEffect(() => {
    const indexMerchants = async () => {
      try {
        const response = await userApis.indexProfiles("Merchant");
        setMerchants(response?.data?.Merchant);
      } catch (err) {
        toast.error(err?.response?.data?.error);
      }
    };
    indexMerchants();
  }, []);

  return (
    <>
      <Grid container spacing={4}>
        {merchants?.map((merchant) => (
          <Grid key={merchant.id} item xs={4}>
            <MerchantCard key={merchant.id} merchant={merchant} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Merchants;
