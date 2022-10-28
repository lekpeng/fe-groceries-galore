export const initialCartState = [];
// Selectors

export const getProductQuantity = (cart, productId) => {
  for (const order of cart) {
    for (const orderDetail of order.OrderDetails) {
      if (orderDetail.ProductId === productId) {
        return orderDetail.productQuantity;
      }
    }
  }
  return 0;
};

const getOrderQuantity = (order) => {
  console.log(
    "order.OrderDetails",
    order?.OrderDetails.reduce((total, orderDetail) => total + orderDetail.productQuantity, 0)
  );
  return order?.OrderDetails.reduce((total, orderDetail) => total + orderDetail.productQuantity, 0);
};

const getOrderAmountPayable = (order) => {
  order.OrderDetails?.reduce(
    (total, orderDetail) => orderDetail.productPrice * orderDetail.productQuantity + total,
    0
  );
};
export const getCartQuantity = (cart) => {
  console.log("RUNning GET CART QUANTIY");
  console.log(
    "quanity",
    cart?.reduce((total, order) => {
      return total + getOrderQuantity(order);
    }, 0)
  );
  return cart?.reduce((total, order) => total + getOrderQuantity(order), 0);
};

export const getCartAmountPayable = (cart) =>
  cart?.reduce((total, order) => total + getOrderAmountPayable(order), 0);

const existingOrderWithSameMerchant = (merchantId, cart) => {
  return cart?.find((Order) => Order.MerchantId === merchantId);
};

const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "INITIALIZE_CART": {
      const cart = action.cart;
      return [...cart];
    }
    // case "INCREMENT_PRODUCT_QUANTITY": {
    //   const updatedCart = cartState.cart.map((cartItem) => {
    //     let updatedCartItem = { ...cartItem };

    //     if (cartItem.id === action.item.id) {
    //       updatedCartItem.quantity += 1;
    //     }
    //     return updatedCartItem;
    //   });
    //   console.log("updated cart after increment", {
    //     ...cartState,
    //     cart: updatedCart,
    //   });
    //   return {
    //     ...cartState,
    //     cart: updatedCart,
    //   };
    // }
    // case "DECREMENT_PRODUCT_QUANTIY": {
    //   const updatedCart = cartState.cart.map((cartItem) => {
    //     let updatedCartItem = { ...cartItem };

    //     if (cartItem.id === action.item.id) {
    //       updatedCartItem.quantity -= 1;
    //     }
    //     return updatedCartItem;
    //   });
    //   console.log("updated cart after decrement", {
    //     ...cartState,
    //     cart: updatedCart.filter((cartItem) => cartItem.quantity > 0),
    //   });
    //   return {
    //     ...cartState,
    //     cart: updatedCart.filter((cartItem) => cartItem.quantity > 0),
    //   };
    // }
    // case "ADD_NEW_PRODUCT_TO_CART": {
    //   const existingOrder = existingOrderWithSameMerchant(action.product.MerchantId, cartState);
    //   // if (){

    //   // }else{

    //   // }
    // }

    // case "REMOVE_ALL_QUANTITIES_OF_PRODUCT_FROM_CART": {
    //   console.log("updated cart after remove from cart", {
    //     ...cartState,
    //     cart: cartState.cart.filter((cartItem) => cartItem.id !== action.item.id),
    //   });

    //   return {
    //     ...cartState,
    //     cart: cartState.cart.filter((cartItem) => cartItem.id !== action.item.id),
    //   };
    // }

    // case "EMPTY_CART": {
    //   return [];
    // }

    default:
      return cartState;
  }
};

export default cartReducer;
