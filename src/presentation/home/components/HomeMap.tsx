import { useState, useMemo, forwardRef, ForwardedRef } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// styles
import { Box, CircularProgress, Typography, css } from "@mui/material";
// constants
import { MOVE_MAP_DELAY, curLocationMarker } from "@/presentation/configs";
// lib
import { debounce } from "lodash";
// store
import { locationStore } from "@/store/locationStore";
import { levelToRadius } from "@/data/util/map";
import { ReadByLocationDto } from "@/domain/dtos/accidentObserve";
import { MapResults } from "./MapResults";

interface HomeMapProps {
  isBatshu?: boolean;
}

const useReadMapData = () => {
  const { location } = locationStore();
  const [debouncedLocation, setDebouncedLocation] = useState<ReadByLocationDto>(
    {
      x: location.lng,
      y: location.lat,
      radius: levelToRadius(location.level),
    }
  );

  const moveHandler = useMemo(
    () =>
      debounce((map: kakao.maps.Map) => {
        const pos = map.getCenter();
        setDebouncedLocation((prev) => ({
          x: pos.getLng(),
          y: pos.getLat(),
          radius: prev.radius,
        }));
      }, MOVE_MAP_DELAY),
    []
  );

  const zoomHandler = useMemo(
    () => (map: kakao.maps.Map) => {
      const level = map.getLevel();
      setDebouncedLocation((prev) => ({
        ...prev,
        radius: levelToRadius(level),
      }));
    },
    []
  );

  return {
    debouncedLocation,
    moveHandler,
    zoomHandler,
  };
};

const HomeMap = (
  { isBatshu = true }: HomeMapProps,
  mapRef: ForwardedRef<kakao.maps.Map>
) => {
  const { location, status } = locationStore();

  const { debouncedLocation, zoomHandler, moveHandler } = useReadMapData();
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
          <MapResults
            isBatshu={isBatshu}
            location={debouncedLocation}
            mapRef={mapRef}
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
