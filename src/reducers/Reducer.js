export const initialState = {
  isLoading: false,
  cart: [],
};
// Selectors

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART": {
      return { ...state, cart: action.cart };
    }

    default:
      return true;
  }
};

export default reducer;
