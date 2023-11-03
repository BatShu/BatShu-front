import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";
import { MapMarker } from "react-kakao-maps-sdk";
import { AccidentDrawer } from "./AccidentDrawer";
import { ILocation } from "@/domain/models/location";
import { useState, useCallback, ForwardedRef } from "react";
import { pinMarker } from "@/presentation/configs";
import { useReadAccidentsByLocation } from "@/data/hooks/accident";

interface MapAccidentsProps {
  location: ReadByLocationDto;
  mapRef: ForwardedRef<kakao.maps.Map>;
}
export const MapAccidents = ({ location, mapRef }: MapAccidentsProps) => {
  const { data } = useReadAccidentsByLocation(location);

  const accidents = data ?? [];
  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);
  const clickMarker = useCallback(
    (id: number, { lat, lng }: Pick<ILocation, "lat" | "lng">) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setAccidentDrawerId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );
  const markerImage = pinMarker(false);
  return (
    <>
      {accidents.map(({ accidentId, accidentLocation: { y, x } }) => (
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
