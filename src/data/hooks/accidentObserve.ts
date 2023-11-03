import { Accident } from "@/domain/models/accident";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { accidentObserverRepository } from "../backend";
import {
  ReadAccidentsByLocationData,
  ReadByLocationDto,
  ReadObservesByLocationData,
} from "@/domain/dtos/accidentObserve";
import { Observe } from "@/domain/models/observe";
import { ILocationDto } from "@/domain/dtos/location";

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

export const useReadAccidentOrObserveAddress = (
  id: number,
  isAccident: boolean
) => {
  return useQuery({
    queryKey: ["accidentOrObservePlaceName", isAccident, id],
    enabled: id != null,
    queryFn: async () => {
      let location: ILocationDto;
      if (isAccident) {
        const accident = await accidentObserverRepository.readAccidentById(id);
        location = accident.accidentLocation;
      } else {
        const observe = await accidentObserverRepository.readObserveById(id);
        location = observe.observeLocation;
      }
      const geoEncoder = new kakao.maps.services.Geocoder();
      return new Promise<kakao.maps.services.Address>((resolve, reject) => {
        geoEncoder.coord2Address(location.x, location.y, (data, status) => {
          if (status === kakao.maps.services.Status.OK) {
            resolve(data[0].address);
          }
          reject("검색 결과가 없습니다.");
        });
      });
    },
  });
};
