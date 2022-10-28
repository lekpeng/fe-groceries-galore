import { createContext, useReducer } from "react";

const CartContext = createContext({});

export const CartProvider = ({ cartReducer, initialState, children }) => {
  return (
    <CartContext.Provider value={useReducer(cartReducer, initialState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
