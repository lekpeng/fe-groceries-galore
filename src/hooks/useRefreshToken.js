import userApis from "../apis/user";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await userApis.refreshAccessToken();
    setAuth((prev) => {
      console.log("previous auth", JSON.stringify(prev));
      console.log("new access token", response.data.accessToken);

      return { user: { ...prev.user, accessToken: response.data.accessToken } };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
