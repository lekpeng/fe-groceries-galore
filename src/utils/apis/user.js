import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const userApis = {
  auth: async (formData, authType, userType) => {
    const response = await axios.post(
      `${baseUrl}/api/v1/users/${authType}`,
      { formData, userType },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    return response;
  },

  confirm: async (emailToken) => {
    const response = await axios.patch(
      `${baseUrl}/api/v1/users/confirm`,
      { emailToken },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response;
  },
};

export default userApis;
