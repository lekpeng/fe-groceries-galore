import axios from "./axios";

const productApis = {
  indexProducts: async (query = "") => {
    if (query) {
      const response = await axios.get(`/products/?query=${query}`);
      return response;
    }
    const response = await axios.get("/products");
    return response;
  },

  showProduct: async (productId) => {
    const response = await axios.get(`/products/${productId}`);
    return response;
  },
};
export default productApis;
