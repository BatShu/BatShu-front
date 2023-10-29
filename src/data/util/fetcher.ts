import { AppApiError } from "@/domain/models/appError";
import { handleError } from "@/lib";
import { useAuthStore } from "@/store/authStore";
import axios, { AxiosError } from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: Partial<RequestInit> = {
  credentials: "omit",
};

const request = async <T>(
  url: string,
  config: RequestInit = {}
): Promise<T> => {
  try {
    const res = await fetch(url, { ...defaultConfig, ...config });
    const body = await res.json();
    if (body.ok === false) {
      throw new AppApiError({
        status: res.status,
        message: body.msg,
      });
    }
    return body satisfies T;
  } catch (error) {
    if (error instanceof AppApiError) {
      throw error;
    }
    throw new Error(`Error: ${error}`);
  }
};

const API = {
  headers: {},

  GET: async function <T>(endpoint: string, config?: RequestInit) {
    return await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "GET",
      ...config,
      headers: { ...this.headers, ...config?.headers },
    });
  },

  POST: async function <T>(endpoint: string, config?: RequestInit) {
    return await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "POST",
      ...config,
      headers: { ...this.headers, ...config?.headers },
    });
  },

  DELETE: async function <T>(endpoint: string, config?: RequestInit) {
    await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      ...config,
      headers: { ...this.headers, ...config?.headers },
    });
  },

  PATCH: async function <T>(endpoint: string, config?: RequestInit) {
    await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "PATCH",
      ...config,
      headers: { ...this.headers, ...config?.headers },
    });
  },
};
export const authApi = axios.create();
authApi.defaults.baseURL = VITE_API_BASE_URL;
authApi.defaults.withCredentials = true;
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

export { request, API };
