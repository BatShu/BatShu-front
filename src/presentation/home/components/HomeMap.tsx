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
// store
import { ILocation, locationStore } from "@/store/locationStore";
// components
import AccidentDrawer from "./AccidentDrawer";

interface HomeMapProps {
  isBatshu?: boolean;
}

const HomeMap = (
  { isBatshu = true }: HomeMapProps,
  mapRef: ForwardedRef<kakao.maps.Map>
) => {
  const { location, status } = locationStore();

  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);

  // useReadAccidentsByLocation(1, 1, 1);

  const clickMarker = useCallback(
    (id: number, { lat, lng }: ILocation) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      setAccidentDrawerId(id);
      if (mapRef.current.getLevel() >= 8) {
        mapRef.current.setLevel(2);
      }
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );

  const markerImage = useMemo(() => pinMarker(isBatshu), [isBatshu]);

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
        <Map center={location} level={4} css={styles.map} isPanto ref={mapRef}>
          {!status.error && (
            <MapMarker position={location} image={curLocationMarker} />
          )}
          {dummyDatadata.map(({ id, location: { y, x } }) => (
            <MapMarker
              key={id}
              position={{ lat: y, lng: x }}
              image={markerImage}
              onClick={() => clickMarker(id, { lat: y, lng: x })}
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

const dummyDatadata = [
  {
    id: 0,
    location: {
      x: 127.02877138902706,
      y: 37.553756043633705,
      level: 1,
    },
  },
  {
    id: 1,
    location: {
      x: 127.11223931056016,
      y: 37.59973258972703,
      level: 2,
    },
  },
  {
    id: 2,
    location: {
      x: 127.03877138902706,
      y: 37.5737560436337,
      level: 1,
    },
  },
];
