import { createContext, useReducer } from "react";

const StoreContext = createContext({});

export const StoreProvider = ({ reducer, initialState, children }) => {
  return (
    <StoreContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
