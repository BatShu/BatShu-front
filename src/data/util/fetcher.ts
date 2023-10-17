import { AppApiError } from "@/domain/models/appError";

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
  GET: async <T>(endpoint: string, config?: RequestInit) => {
    return await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "GET",
      ...config,
    });
  },

  POST: async <T>(endpoint: string, config?: RequestInit) =>
    await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "POST",
      ...config,
    }),

  DELETE: async <T>(endpoint: string, config?: RequestInit) =>
    await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      ...config,
    }),

  PATCH: async <T>(endpoint: string, config?: RequestInit) =>
    await request<T>(`${VITE_API_BASE_URL}/${endpoint}`, {
      method: "PATCH",
      ...config,
    }),
};

export { request, API };
