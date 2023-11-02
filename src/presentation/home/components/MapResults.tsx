import { useState, useEffect, useCallback, ForwardedRef } from "react";
import { useSearchParams } from "react-router-dom";
import { MapMarker } from "react-kakao-maps-sdk";
// types
import { ILocation } from "@/domain/models/location";
import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";
// constants
import { pinMarker } from "@/presentation/configs";
// hooks
import {
  useReadAccidentsByLocation,
  useReadObservesByLocation,
} from "@/data/hooks/accident";
// components
import AccidentDrawer from "./AccidentDrawer";

interface MapResultsProps {
  isBatshu: boolean;
  location: ReadByLocationDto;
  mapRef: ForwardedRef<kakao.maps.Map>;
}

export const MapResults = ({ isBatshu, location, mapRef }: MapResultsProps) => {
  const [params, _] = useSearchParams();

  const { data: accidentData } = useReadAccidentsByLocation(location);
  const { data: observeData } = useReadObservesByLocation(location);

  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);
  const [accidents, setAccidents] = useState(accidentData ?? []);
  const [observes, setObserves] = useState(observeData ?? []);

  const clickMarker = useCallback(
    (id: number, { lat, lng }: Pick<ILocation, "lat" | "lng">) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setAccidentDrawerId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );

  const markerImage = pinMarker(isBatshu);

  useEffect(() => {
    if (!params.size) return;
    const x = params.get("x");
    const y = params.get("y");
    const carNumber = params.get("carNumber");
    const date = params.get("date");
    console.log(x, y, carNumber, date);
  }, [params]);

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
