import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const _axios: AxiosInstance = axios.create({
  baseURL,
});
