import { queryWrapper } from "@/lib";
import { AppLocation } from "../models/location";

export const GET_ACCIDENT_BY_LOCATION =
  queryWrapper<AppLocation>("api/accident");
export const GET_ACCIDENT_BY_ID = (accidentId: number) =>
  `api/accident/${accidentId}`;

export const POST_ACCIDENT = "api/accident";
