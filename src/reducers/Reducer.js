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

    case "SET_LOADING": {
      return { ...state, isLoading: action.isLoading };
    }

    default:
      return true;
  }
};

export default reducer;
