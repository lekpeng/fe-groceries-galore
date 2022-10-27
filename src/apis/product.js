import axios from "./axios";

const productApis = {
  indexProducts: async () => {
    const response = await axios.get("/products");
    return response;
  },
};
export default productApis;
