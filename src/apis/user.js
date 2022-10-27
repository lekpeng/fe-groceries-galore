import axios from "./axios";

const userApis = {
  auth: async (formData, userType, authType) => {
    const response = await axios.post(
      `/users/${authType}`,
      { formData, userType },
      {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      }
    );

    return response;
  },

  logout: async () => {
    const response = await axios.delete("/users/logout", {
      headers: { "Content-type": "application/json" },
      withCredentials: true,
    });
    return response;
  },

  confirm: async (emailToken) => {
    const response = await axios.patch(
      "/users/confirm",
      { emailToken },
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return response;
  },

  refreshAccessToken: async () => {
    const response = await axios.post(
      "/users/refresh-token",
      {},
      {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  },

  showProfile: async (user) => {
    const { email, userType } = user;
    const response = await axios.get(`/users/profiles/${userType}/${email}`);
    return response;
  },
};

export default userApis;
