import { queryWrapper } from "@/lib";

export const API_ACCIDENT_PATH = "api/accident";

// USER
export const POST_GET_USER = "api/users";
export const POST_REGISTER_USER = "api/users/register";

// ACCIDENT
export const GET_ACCIDENT_BY_LOCATION = queryWrapper("api/accident");
export const GET_ACCIDENT_BY_ID = (accidentId: number) =>
  `api/accident/${accidentId}`;

export const POST_ACCIDENT = "api/accident";

// OBSERVATION
export const GET_OBSERVE_BY_LOCATION = queryWrapper("api/observe");
export const GET_OBSERVE_BY_ID = (observeId: number) =>
  `api/observe/${observeId}`;
export const GET_VIDEO_STATUS = (videoId: number) =>
  `api/observe/check/status/${videoId}`;

export const POST_OBSERVE = "api/observe";
export const POST_VIDEO_UPLOAD = "api/observe/video";
