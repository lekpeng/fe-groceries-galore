import axios from "./axios";

const productCategoryApis = {
  indexProductCategories: async () => {
    const response = await axios.get("/product-categories");
    return response;
  },
};
export default productCategoryApis;
