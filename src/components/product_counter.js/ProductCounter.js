import { IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useStateValue from "../../hooks/useStateValue";
// import debounce from "lodash.debounce";
// import { useMemo, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ProductCounter({ product, customerProductQuantity }) {
  const { auth, setAuth } = useAuth();
  const [{ cart }, dispatch] = useStateValue();
  // const [numClicks, setNumClicks] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  const removeItem = async () => {
    const newCustomerProductQuantity = Math.max(0, customerProductQuantity - 1);
    try {
      const cartResponse = await axiosPrivate.put("/orders/cart/remove-items", {
        product: product,
        customerProductQuantity: newCustomerProductQuantity,
      });

      console.log("REMOVE CART RESPONSE", cartResponse);
      await dispatch({
        type: "SET_CART",
        cart: cartResponse.data.orders,
      });
    } catch (err) {
      console.log("err in removing item", err);
      console.log(err.response.data.error);
    }
  };

  const addItem = async () => {
    const newCustomerProductQuantity = Math.min(product.quantity, customerProductQuantity + 1);

    try {
      const cartResponse = await axiosPrivate.post("/orders/cart/add-items", {
        product: product,
        customerProductQuantity: newCustomerProductQuantity,
      });
      await dispatch({
        type: "SET_CART",
        cart: cartResponse.data.orders,
      });
    } catch (err) {
      console.log("err in adding item", err);
      console.log(err.response.data.error);
    }
  };

  return (
    <>
      <IconButton onClick={removeItem}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {customerProductQuantity} in cart
      </Typography>
      <IconButton onClick={addItem}>
        <AddIcon />
      </IconButton>
    </>
  );
}

export default ProductCounter;
