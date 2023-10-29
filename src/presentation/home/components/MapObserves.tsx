import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";
import { ILocation } from "@/domain/models/location";
import { pinMarker } from "@/presentation/configs";
import { ForwardedRef, useState, useCallback } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { useReadObservesByLocation } from "@/data/hooks/accident";
import ObserveDrawer from "./ObserveDrawer";

interface MapObservesProps {
  location: ReadByLocationDto;
  mapRef: ForwardedRef<kakao.maps.Map>;
}
export const MapObserves = ({ location, mapRef }: MapObservesProps) => {
  const { data } = useReadObservesByLocation(location);
  const observes = data ?? [];
  const [activeObserveId, setActiveObserveId] = useState<number | null>(null);
  const clickMarker = useCallback(
    (id: number, { lat, lng }: Pick<ILocation, "lat" | "lng">) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setActiveObserveId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );
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
      <ObserveDrawer
        observeId={activeObserveId}
        onClose={() => setActiveObserveId(null)}
      />
    </>
  );
};
