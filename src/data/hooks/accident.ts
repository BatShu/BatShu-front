import {
  GET_ACCIDENT_BY_ID,
  GET_ACCIDENT_BY_LOCATION,
} from "@/domain/endpoint";
import { Accident } from "@/domain/models/accident";
import { ILocation } from "@/domain/models/location";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API } from "@/lib";

export interface ReadAccidentsByLocationResponse {
  ok: boolean;
  data: {
    id: number;
    location: ILocation;
  }[];
}
export const useReadAccidentsByLocation = (
  x: number,
  y: number,
  level: number
): UseQueryResult<ReadAccidentsByLocationResponse> => {
  return useQuery({
    queryKey: ["accidents", x, y],
    queryFn: () =>
      API.GET<ReadAccidentsByLocationResponse>(
        GET_ACCIDENT_BY_LOCATION({ x, y, level })
      ),
  });
};

export interface ReadAccidentByIdResponse {
  ok: boolean;
  data: Accident;
}
export const useReadAccidentById = (
  accidentId: number
): UseQueryResult<ReadAccidentByIdResponse> => {
  return useQuery({
    queryFn: () =>
      API.GET<ReadAccidentByIdResponse>(GET_ACCIDENT_BY_ID(accidentId)),
  });
};
