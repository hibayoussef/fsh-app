import { HttpRequestInterceptor } from "./http-request.interceptor";
import { HttpResponseInterceptor } from "./http-response.interceptor";
import { NavigateFunction } from "react-router-dom";

export const setupInterceptors = (navigate: NavigateFunction) => {
  HttpRequestInterceptor();
  HttpResponseInterceptor(navigate);
};
