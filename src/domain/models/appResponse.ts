export type AppResponse<T = any> = {
  ok: boolean;
  msg: string;
  data: T;
};

export type TPostAccidentResponse = Omit<AppResponse, "data">;

export type TVideoUploadResponse = AppResponse<{ videoId: [{ id: number }] }>;

export type TPostObserveResponse = AppResponse<{
  observeId: number;
  uid: string;
  videoUrl: string;
  thumbnailUrl: string;
  contentTitle: string;
  contentDescription: string;
  observeStartTime: string;
  observeEndTime: string;
  observeLocation: { x: number; y: number };
  createdAt: string;
}>;
