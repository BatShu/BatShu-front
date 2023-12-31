import { queryWrapper } from "@/lib";
import { ReadByLocationDto } from "../dtos/accidentObserve";

export const GET_OBSERVE_BY_LOCATION =
  queryWrapper<ReadByLocationDto>("api/observe");
export const GET_OBSERVE_BY_ID = (observeId: number) =>
  `api/observe/${observeId}`;
export const GET_VIDEO_STATUS = (videoId: number) =>
  `api/observe/check/status/${videoId}`;

export const POST_OBSERVE = "api/observe/register";
export const POST_VIDEO_UPLOAD = "api/observe/video";
