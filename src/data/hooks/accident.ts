import { Accident } from "@/domain/models/accident";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { accidentObserverRepository } from "../backend";
import {
  ReadAccidentsByLocationData,
  ReadByLocationDto,
  ReadObservesByLocationData,
} from "@/domain/dtos/accidentObserve";
import { Observe } from "@/domain/models/observe";

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

export const useReadAccidentById = (
  accidentId: number | null
): UseQueryResult<Accident> => {
  return useQuery({
    queryKey: ["accident", accidentId],
    enabled: accidentId != null,
    queryFn: () => accidentObserverRepository.readAccidentById(accidentId ?? 0),
  });
};

export const useReadObserveById = (
  observeId: number | null
): UseQueryResult<Observe> => {
  return useQuery({
    queryKey: ["observe", observeId],
    enabled: observeId != null,
    queryFn: () => accidentObserverRepository.readObserveById(observeId ?? 0),
  });
};

export const useReadAccidentOrObserveById = (
  id: number | null,
  isAccident: boolean
): UseQueryResult<Accident | Observe> => {
  return useQuery({
    queryKey: ["accidentOrObserve", isAccident, id],
    enabled: id != null,
    queryFn: () => {
      if (isAccident) {
        return accidentObserverRepository.readAccidentById(id ?? 0);
      }
      return accidentObserverRepository.readObserveById(id ?? 0);
    },
  });
};
