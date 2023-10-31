import { AppApiError } from "@/domain/models/appError";
import { handleError } from "@/lib";
import { useAuthStore } from "@/store/authStore";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: AxiosRequestConfig = {
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
};

export const authApi = axios.create(defaultConfig);

authApi.interceptors.request.use(async (req) => {
  if (req.headers["Authorization"] != null) {
    return req;
  }
  const fbUser = useAuthStore.getState().fbUser;
  if (fbUser == null) {
    return Promise.reject(new Error("User is not logged in"));
  }
  const token = await fbUser.getIdToken();
  req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});
authApi.interceptors.response.use(
  (res) => {
    if (res.data.ok == false || res.status >= 400) {
      return Promise.reject(
        new AppApiError({
          message: res.data.msg ?? "Unknown error",
          status: res.status,
        })
      );
    }
    return res;
  },
  (error) => {
    if (error instanceof AxiosError) {
      if (error.response?.data != null) {
        return Promise.reject(
          new AppApiError({
            message: error.response.data.msg ?? "Unknown error",
            status: error.response.status,
          })
        );
      }
    }
    return Promise.reject(handleError(error));
  }
);
