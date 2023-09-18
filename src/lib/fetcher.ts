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

    return (await res.json()) satisfies T;
  } catch (error) {
    console.log(`Error: ${error}`);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return new Promise(() => {});
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
