import { IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import useStateValue from "../../hooks/useStateValue";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";

const INTERVAL = 500;

function ProductCounter({ product, customerProductQuantity }) {
  const [{ cart }, dispatch] = useStateValue();
  const axiosPrivate = useAxiosPrivate();
  const [changesInQuantity, setChangesInQuantity] = useState({ add: 0, remove: 0 });
  const [isTimeToMakeApiCall, setIsTimeToMakeApiCall] = useState(false);

  const addItem = async (increment) => {
    // TODO: alert customer not to increase beyond product stock
    if (customerProductQuantity + increment > product.quantity) {
      toast.error(`Only ${product.quantity} left in stock!`);
    }
    const newCustomerProductQuantity = Math.min(product.quantity, customerProductQuantity + increment);

    try {
      const cartResponse = await axiosPrivate.post("/orders/cart/add-items", {
        product: product,
        customerProductQuantity: newCustomerProductQuantity,
      });
      console.log("ADD CART RESPONSE", cartResponse);
      dispatch({
        type: "SET_CART",
        cart: cartResponse.data.orders,
      });
      setChangesInQuantity({ add: 0, remove: 0 });
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };
  const removeItem = async (decrement) => {
    // TODO: prevent customer from decreasing when item count is already 0 in cart
    const newCustomerProductQuantity = Math.max(0, customerProductQuantity + decrement);
    try {
      const cartResponse = await axiosPrivate.put("/orders/cart/remove-items", {
        product: product,
        customerProductQuantity: newCustomerProductQuantity,
      });

      console.log("REMOVE CART RESPONSE", cartResponse);
      dispatch({
        type: "SET_CART",
        cart: cartResponse.data.orders,
      });
      setChangesInQuantity({ add: 0, remove: 0 });
    } catch (err) {
      toast.error(err?.response?.data?.error);
    }
  };

  const makeApiCall = () => {
    const changeInQuantity = changesInQuantity.add - changesInQuantity.remove;
    if (changeInQuantity > 0) {
      addItem(changeInQuantity);
    }

    if (changeInQuantity < 0) {
      removeItem(changeInQuantity);
    }
  };
  useEffect(() => {
    if (isTimeToMakeApiCall) {
      makeApiCall();
    }
  }, [isTimeToMakeApiCall]);

  const debouncedApiCall = useCallback(
    debounce(() => {
      setIsTimeToMakeApiCall(true);
    }, INTERVAL),
    []
  );

  const handleClick = (type) => {
    setIsTimeToMakeApiCall(false);
    setChangesInQuantity((prev) => {
      return { ...prev, [type]: prev[type] + 1 };
    });
    return debouncedApiCall();
  };

  return (
    <>
      <IconButton className="remove" onClick={() => handleClick("remove")}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="body2" color="text.secondary">
        {customerProductQuantity} in cart
      </Typography>
      <IconButton className="add" onClick={() => handleClick("add")}>
        <AddIcon />
      </IconButton>
    </>
  );
}

export default ProductCounter;
