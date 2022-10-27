import userApis from "../apis/user";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await userApis.refreshAccessToken();
    setAuth((prev) => {
      return { user: { ...prev.user, accessToken: response.data.accessToken } };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
