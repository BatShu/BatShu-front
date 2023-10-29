import { GET_ACCIDENT_BY_ID } from "@/domain/endpoint";
import { Accident } from "@/domain/models/accident";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API } from "../util/fetcher";
import { accidentObserverRepository } from "../backend";
import {
  ReadAccidentsByLocationData,
  ReadByLocationDto,
  ReadObservesByLocationData,
} from "@/domain/dtos/accidentObserve";

export const useReadAccidentsByLocation = (
  dto: ReadByLocationDto
): UseQueryResult<ReadAccidentsByLocationData> => {
  return useQuery({
    queryKey: ["accidents", dto],
    queryFn: () => accidentObserverRepository.readAccidentsByLocation(dto),
  });
};

export const useReadObservesByLocation = (
  dto: ReadByLocationDto
): UseQueryResult<ReadObservesByLocationData> => {
  return useQuery({
    queryKey: ["observes", dto],
    queryFn: () => accidentObserverRepository.readObservesByLocation(dto),
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
