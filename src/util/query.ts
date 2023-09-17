import queryString from "query-string";

export type query = Record<string, any>;

export const queryWrapper = (url: string) => (_query?: query) =>
  _query ? `${url}?${queryString.stringify(_query)}` : url;
