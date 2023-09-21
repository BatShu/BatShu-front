import queryString from "query-string";

export type query = Record<string, any>;

export const queryWrapper =
  <T = query>(url: string) =>
  (_query?: T) =>
    _query ? `${url}?${queryString.stringify(_query)}` : url;
