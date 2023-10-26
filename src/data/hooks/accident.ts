import {
  GET_ACCIDENT_BY_ID,
  GET_ACCIDENT_BY_LOCATION,
} from "@/domain/endpoint";
import { Accident, AccidentPreview } from "@/domain/models/accident";
import { ILocation } from "@/domain/models/location";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API, authApi } from "../util/fetcher";
import { AppResponse } from "@/domain/models/appResponse";

export type ReadAccidentsByLocationData = AccidentPreview[];
export const useReadAccidentsByLocation = (
  location: ILocation
): UseQueryResult<AppResponse<ReadAccidentsByLocationData>> => {
  return useQuery({
    queryKey: ["accidents", location],
    queryFn: () =>
      authApi.get<AppResponse<ReadAccidentsByLocationData>>(
        GET_ACCIDENT_BY_LOCATION({
          x: location.lng,
          y: location.lat,
        })
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
