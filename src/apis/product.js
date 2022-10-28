import axios from "./axios";

const productApis = {
  indexProducts: async () => {
    const response = await axios.get("/products");
    return response;
  },

  showProduct: async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    console.log("RESPONSE IN API", response);
    return response;
  },
};
export default productApis;
