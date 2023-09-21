import { queryWrapper } from "@/lib";
import { AppLocation } from "../models/location";

export const GET_OBSERVE_BY_LOCATION = queryWrapper<AppLocation>("api/observe");
export const GET_OBSERVE_BY_ID = (observeId: number) =>
  `api/observe/${observeId}`;
export const GET_VIDEO_STATUS = (videoId: number) =>
  `api/observe/check/status/${videoId}`;

export const POST_OBSERVE = "api/observe";
export const POST_VIDEO_UPLOAD = "api/observe/video";
