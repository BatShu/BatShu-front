import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";
import { ILocation } from "@/domain/models/location";
import { pinMarker } from "@/presentation/configs";
import { ForwardedRef, useState, useCallback } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import AccidentDrawer from "./AccidentDrawer";
import { useReadObservesByLocation } from "@/data/hooks/accident";

interface MapObservesProps {
  location: ReadByLocationDto;
  mapRef: ForwardedRef<kakao.maps.Map>;
}
export const MapObserves = ({ location, mapRef }: MapObservesProps) => {
  const { data } = useReadObservesByLocation(location);
  const observes = data ?? [];
  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);
  const clickMarker = useCallback(
    (id: number, { lat, lng }: Pick<ILocation, "lat" | "lng">) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setAccidentDrawerId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );
  console.log(observes);
  const markerImage = pinMarker(true);
  return (
    <>
      {observes.map(({ observeId, observeLocation: { y, x } }) => (
        <MapMarker
          key={observeId}
          position={{ lat: y, lng: x }}
          image={markerImage}
          onClick={() => clickMarker(observeId, { lat: y, lng: x })}
        />
      ))}
      <AccidentDrawer
        accidentId={accidentDrawerId}
        onClose={() => setAccidentDrawerId(null)}
      />
    </>
  );
};
