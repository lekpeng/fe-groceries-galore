import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { axiosPrivate } from "../apis/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  // intercept works much like event listener. should remove after each time to avoid multiple intercepts.

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = axiosPrivate.interceptors.request.use(
      // Do something before request is sent: Always add authorization to header before sending request
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.user?.accessToken}`;
        }
        return config;
      },

      // Do something with request error
      (error) => Promise.reject(error)
    );

    // Add a response interceptor: we are intercept response before it is handled by a catch block in the FE, allowing the access token to be refreshed so we dont get an error under catch because access token expired.

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // Any status code that lie within the range of 2xx cause this function to trigger. Do something with response data
      (response) => response,

      // Any status codes that falls outside the range of 2xx cause this function to trigger. Do something with response error
      async (error) => {
        const prevRequest = error?.config;
        // We make another backend request here to refresh the access token. But we don't want an endless loop, so we check that prevRequest.sent is false before sending
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
