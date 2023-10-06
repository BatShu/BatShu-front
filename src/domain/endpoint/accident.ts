import { queryWrapper } from "@/lib";
import { ILocation } from "../models/location";

export const GET_ACCIDENT_BY_LOCATION = queryWrapper<ILocation>("api/accident");
export const GET_ACCIDENT_BY_ID = (accidentId: number) =>
  `api/accident/${accidentId}`;

export const POST_ACCIDENT = "api/accident";
