import { queryWrapper } from "@/lib";

export const GET_ACCIDENT_BY_LOCATION = queryWrapper<{
  x: number;
  y: number;
  radius: number;
}>("api/accident");
export const GET_ACCIDENT_BY_ID = (accidentId: number) =>
  `api/accident/${accidentId}`;

export const POST_ACCIDENT = "api/accident";
