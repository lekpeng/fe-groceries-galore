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

export const getOrderQuantity = (order) => {
  return order?.OrderDetails?.reduce(
    (total, orderDetail) => total + orderDetail.productQuantity,
    0
  );
};

export const getOrderAmountPayable = (order) => {
  return order?.OrderDetails?.reduce(
    (total, orderDetail) => orderDetail.productPrice * orderDetail.productQuantity + total,
    0
  );
};

export const getCartQuantity = (cart) => {
  return cart?.reduce((total, order) => total + getOrderQuantity(order), 0);
};

export const getCartAmountPayable = (cart) =>
  cart?.reduce((total, order) => total + getOrderAmountPayable(order), 0);

const existingOrderWithSameMerchant = (merchantId, cart) => {
  return cart?.find((Order) => Order.MerchantId === merchantId);
};
