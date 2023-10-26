import { AppApiError } from "@/domain/models/appError";

const { VITE_API_BASE_URL } = import.meta.env;

const defaultConfig: Partial<RequestInit> = { credentials: "omit" };

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

export { request, API };
