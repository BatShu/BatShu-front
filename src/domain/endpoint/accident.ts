import { queryWrapper } from "@/lib";
import { ReadAccidentsByLocationDto } from "../dtos/accidentObserve";

export const GET_ACCIDENT_BY_LOCATION =
  queryWrapper<ReadAccidentsByLocationDto>("api/accident");
export const GET_ACCIDENT_BY_ID = (accidentId: number) =>
  `api/accident/${accidentId}`;

export const POST_ACCIDENT = "api/accident";
