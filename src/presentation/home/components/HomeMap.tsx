import {
  useState,
  forwardRef,
  ForwardedRef,
  useMemo,
  useCallback,
} from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// styles
import { Box, CircularProgress, Typography, css } from "@mui/material";
import { curLocationMarker, pinMarker } from "@/presentation/configs";
// types
import { ILocation } from "@/domain/models/location";
// store
import { locationStore } from "@/store/locationStore";
// components
import AccidentDrawer from "./AccidentDrawer";

import { useReadAccidentsOrObservesByLocation } from "@/data/hooks/accident";
import { levelToRadius } from "@/data/util/map";
import useDebounceValue from "@/presentation/common/hooks/useDebounceValue";
import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";

interface HomeMapProps {
  isBatshu?: boolean;
}

const useReadMapData = (isObserve: boolean) => {
  const { location } = locationStore();
  const [center, setCenter] = useState<ReadByLocationDto>({
    x: location.lng,
    y: location.lat,
    radius: levelToRadius(location.level),
  });
  const debouncedLocation = useDebounceValue<ReadByLocationDto>(center);
  const queryResult = useReadAccidentsOrObservesByLocation(
    debouncedLocation,
    isObserve
  );

  const moveHandler = (map: kakao.maps.Map) => {
    const pos = map.getCenter();
    setCenter((prev) => ({
      x: pos.getLng(),
      y: pos.getLat(),
      radius: prev.radius,
    }));
  };
  const zoomHandler = (map: kakao.maps.Map) => {
    const level = map.getLevel();
    setCenter((prev) => ({ ...prev, radius: levelToRadius(level) }));
  };

  return {
    ...queryResult,
    moveHandler,
    zoomHandler,
  };
};

const HomeMap = (
  { isBatshu = true }: HomeMapProps,
  mapRef: ForwardedRef<kakao.maps.Map>
) => {
  const { location, status } = locationStore();
  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);

  const { data, zoomHandler, moveHandler } = useReadMapData(isBatshu);

  const clickMarker = useCallback(
    (id: number, { lat, lng }: Pick<ILocation, "lat" | "lng">) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setAccidentDrawerId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );

  const markerImage = useMemo(() => pinMarker(isBatshu), [isBatshu]);
  const accidents = data?.data;
  return (
    <Box css={styles.loadingPage}>
      {status.loading ? (
        <>
          <Typography variant="body2" css={styles.text}>
            현재 위치를 가져오는 중 입니다.
          </Typography>
          <CircularProgress css={styles.progress} />
        </>
      ) : (
        <Map
          center={location}
          level={4}
          maxLevel={7}
          css={styles.map}
          isPanto
          ref={mapRef}
          onZoomChanged={zoomHandler}
          onCenterChanged={moveHandler}
        >
          {!status.error && (
            <MapMarker position={location} image={curLocationMarker} />
          )}
          {accidents?.map(({ accidentId, accidentLocation: { y, x } }) => (
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
        </Map>
      )}
    </Box>
  );
};

export default forwardRef(HomeMap);

const styles = {
  loadingPage: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 0,
  }),
  text: css({
    marginBottom: 30,
    fontWeight: 600,
  }),
  progress: css({ color: "var(--primary)" }),
  map: css({
    width: "inherit",
    height: "inherit",
  }),
};
