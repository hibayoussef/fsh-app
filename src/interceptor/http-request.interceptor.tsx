import { _AuthApi } from "../services/auth.service";
import { _axios as Axios } from "./http-config";

export const HttpRequestInterceptor = () => {
  Axios.interceptors.request.use(
    (request) => {
      const token = _AuthApi.getToken();

      if (request.headers) {
        request.headers.Authorization = token ? `Bearer ${token}` : "";

        if (
          !(request.data instanceof FormData) &&
          !request.headers["Content-Type"]
        ) {
          request.headers["Content-Type"] = "application/json";
        }
      }

      return request;
    },
    (error) => Promise.reject(error)
  );
};
