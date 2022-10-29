import { useContext } from "react";
import CartContext from "../context/StoreProvider";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
