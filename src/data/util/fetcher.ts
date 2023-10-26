import { AppApiError } from "@/domain/models/appError";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: Partial<RequestInit> = {
  credentials: "include",
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
authApi.interceptors.request.use((req) => {
  console.log(req);
  if (req.headers["Authorization"] != null) {
    return req;
  }
  const fbUser = useAuthStore.getState().fbUser;
  if (fbUser == null) {
    throw new Error("User is not logged in");
  }
  const token = fbUser.getIdToken();
  req.headers["Authorization"] = `Bearer ${token}`;
  return req;
});
authApi.interceptors.response.use((res) => {
  if (res.data.ok == false || res.status >= 400) {
    throw new AppApiError({
      message: res.data.msg ?? "Unknown error",
      status: res.status,
    });
  }
  return res;
});

export { request, API };
