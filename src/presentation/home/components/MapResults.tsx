import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";
import { MapMarker } from "react-kakao-maps-sdk";
import AccidentDrawer from "./AccidentDrawer";
import { ILocation } from "@/domain/models/location";
import { useState, useCallback, ForwardedRef } from "react";
import { pinMarker } from "@/presentation/configs";
import {
  useReadAccidentsByLocation,
  useReadObservesByLocation,
} from "@/data/hooks/accident";

interface MapResultsProps {
  isBatshu: boolean;
  location: ReadByLocationDto;
  mapRef: ForwardedRef<kakao.maps.Map>;
}

export const MapResults = ({ isBatshu, location, mapRef }: MapResultsProps) => {
  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);

  const { data: accidentData } = useReadAccidentsByLocation(location);
  const { data: observeData } = useReadObservesByLocation(location);

  const accidents = accidentData ?? [];
  const observes = observeData ?? [];

  const clickMarker = useCallback(
    (id: number, { lat, lng }: Pick<ILocation, "lat" | "lng">) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setAccidentDrawerId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );

  const markerImage = pinMarker(isBatshu);

  return (
    <>
      {isBatshu
        ? observes.map(({ observeId, observeLocation: { y, x } }) => (
            <MapMarker
              key={observeId}
              position={{ lat: y, lng: x }}
              image={markerImage}
              onClick={() => clickMarker(observeId, { lat: y, lng: x })}
            />
          ))
        : accidents.map(({ accidentId, accidentLocation: { y, x } }) => (
            <MapMarker
              key={accidentId}
              position={{ lat: y, lng: x }}
              image={markerImage}
              onClick={() => clickMarker(accidentId, { lat: y, lng: x })}
            />
          ))}
      <AccidentDrawer
        accidentId={accidentDrawerId}
        onClose={() => setAccidentDrawerId(null)}
      />
    </>
  );
};
