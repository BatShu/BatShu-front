import { GET_ACCIDENT_BY_ID } from "@/domain/endpoint";
import { Accident } from "@/domain/models/accident";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API } from "../util/fetcher";
import { AppResponse } from "@/domain/models/appResponse";
import { accidentObserverRepository } from "../backend";
import { ReadAccidentsByLocationDto } from "@/domain/dtos/accidentObserve";
import { ReadAccidentsByLocationData } from "../backend/accidentObserve";

export const useReadAccidentsByLocation = (
  dto: ReadAccidentsByLocationDto
): UseQueryResult<AppResponse<ReadAccidentsByLocationData>> => {
  return useQuery({
    queryKey: ["accidents", dto],
    queryFn: () => accidentObserverRepository.readAccidentsByLocation(dto),
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
