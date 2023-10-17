export type AppResponse<T = any> = {
  ok: true;
  msg: string;
  data: T;
};
