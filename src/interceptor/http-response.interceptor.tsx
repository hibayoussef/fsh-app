import { toast } from "react-toastify";
import { _axios } from "./http-config";
import { NavigateFunction } from "react-router-dom";
import { _AuthApi } from "../services/auth.service";

export const HttpResponseInterceptor = (navigate: NavigateFunction) => {
  _axios.interceptors.response.use(
    (response) => {
      const { config, data } = response;
      const url = config?.url;
      const method = config?.method;

      if (url === "/update-device-token") return response;

      if (["post", "put", "patch", "delete"].includes(method || "")) {
        toast.success(data.message, { position: "top-right", autoClose: 3000 });
      }

      return response;
    },
    (error) => {
      const { response, config } = error;
      const url = config?.url;
      const status = response?.status;
      const message = response?.data?.message;

      if (url === "/update-device-token") return Promise.reject(error);

      const showErrorToast = (msg: string) =>
        toast.error(msg, { position: "top-right", autoClose: 3000 });

      switch (status) {
        case 404:
        case 500:
        case 409:
          showErrorToast(message);
          break;
        case 400:
        case 422:
          if (typeof message === "object") {
            Object.values(message).forEach((errors: any) =>
              errors.forEach((err: string) => showErrorToast(err))
            );
          } else {
            showErrorToast(message);
          }
          break;
        case 405:
          Object.keys(message).forEach((key) => showErrorToast(message[key]));
          break;
        case 401:
        case 403:
          navigate("/");
          _AuthApi.destroyToken();
          showErrorToast(message);
          break;
        default:
          showErrorToast(message || "حدث خطأ غير متوقع.");
          break;
      }

      return Promise.reject(error);
    }
  );
};
