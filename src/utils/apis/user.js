import axios from "axios";

const apis = {
  auth: async (formData, authType, userType) => {
    console.log("backend URL", process.env.REACT_APP_BACKEND_URL);
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${authType}`,
      { formData, userType },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return response;
  },
};

export default apis;
