import { API_ACCIDENT_PATH } from "@/domain/apiPaths";
import { API_BASE_URL } from "@/domain/constants";
import { Accident } from "@/domain/models/accident";
import { AppLocation } from "@/domain/models/location";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export interface ReadAccidentsByLocationResponse {
  ok: boolean;
  data: {
    id: number;
    location: AppLocation;
  }[];
}
export const useReadAccidentsByLocation = (
  x: number,
  y: number,
  level: number
): UseQueryResult<ReadAccidentsByLocationResponse> => {
  return useQuery({
    queryKey: ["accidents", x, y],
    queryFn: async () => {
      const res = await fetch(
        `${API_BASE_URL}/${API_ACCIDENT_PATH}?x=${x}&y=${y}&level=${level}`
      );
      const data = await res.json();
      return data satisfies ReadAccidentsByLocationResponse;
    },
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
    queryFn: async () => {
      const res = await fetch(
        `${API_BASE_URL}/${API_ACCIDENT_PATH}/${accidentId}`
      );
      const data = await res.json();
      return data satisfies ReadAccidentByIdResponse;
    },
  });
};
