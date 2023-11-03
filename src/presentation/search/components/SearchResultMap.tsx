import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Box, css } from "@mui/material";
import { enqueueSnackbar } from "notistack";
// hooks
import {
  useReadAccidentsByLocation,
  useReadObservesByLocation,
} from "@/data/hooks/accidentObserve";
// types
import { ILocation } from "@/domain/models/location";
// lib
import { isSameDate } from "@/lib";
// constants
import { pinMarker } from "@/presentation/configs";
// components
import { AccidentDrawer } from "@/presentation/home/components/AccidentDrawer";
import ObserveDrawer from "@/presentation/home/components/ObserveDrawer";

const SearchResultMap = () => {
  const {
    state: { location, licensePlate, date },
  } = useLocation();

  const searchValue = { x: location.lng, y: location.lat, radius: 600 };
  const { data: accidentData } = useReadAccidentsByLocation(searchValue);
  const { data: observeData } = useReadObservesByLocation(searchValue);

  const [accidentDrawerId, setAccidentDrawerId] = useState<number | null>(null);
  const [observeDrawerId, setObserveDrawerId] = useState<number | null>(null);

  const mapRef = useRef<kakao.maps.Map>(null);

  const clickMarker = useCallback(
    (
      id: number,
      { lat, lng }: Pick<ILocation, "lat" | "lng">,
      isAccident: boolean
    ) => {
      if (!mapRef || typeof mapRef === "function" || !mapRef.current) return;

      isAccident ? setAccidentDrawerId(id) : setObserveDrawerId(id);
      mapRef.current.panTo(new kakao.maps.LatLng(lat, lng));
    },
    [mapRef]
  );

  const searchAccidentResult = useMemo(
    () =>
      accidentData?.filter(
        (data) =>
          data.licensePlate === licensePlate &&
          (isSameDate(data.accidentTime[0], date) ||
            isSameDate(data.accidentTime[1], date))
      ) ?? [],
    [accidentData, licensePlate, date]
  );

  const searchObserveResult = useMemo(
    () =>
      observeData?.filter(
        (data) =>
          data.licensePlate === licensePlate &&
          (isSameDate(data.observeTime[0], date) ||
            isSameDate(data.observeTime[1], date))
      ) ?? [],
    [observeData, licensePlate, date]
  );

  useEffect(() => {
    if (!accidentData || !observeData) return;
    const length = searchAccidentResult.length + searchObserveResult.length;

    length
      ? enqueueSnackbar(`${length}개의 글을 찾았어요!`, { variant: "success" })
      : enqueueSnackbar("검색결과가 없습니다");
  }, [accidentData, observeData, searchAccidentResult, searchObserveResult]);

  return (
    <Box css={styles.container}>
      <Map
        center={location}
        level={4}
        maxLevel={7}
        css={styles.map}
        isPanto
        ref={mapRef}
      >
        {searchObserveResult.map(({ observeId, observeLocation: { y, x } }) => (
          <MapMarker
            key={observeId}
            position={{ lat: y, lng: x }}
            image={pinMarker(true)}
            onClick={() => clickMarker(observeId, { lat: y, lng: x }, false)}
          />
        ))}
        {searchAccidentResult.map(
          ({ accidentId, accidentLocation: { y, x } }) => (
            <MapMarker
              key={accidentId}
              position={{ lat: y, lng: x }}
              image={pinMarker(false)}
              onClick={() => clickMarker(accidentId, { lat: y, lng: x }, true)}
            />
          )
        )}
      </Map>
      <AccidentDrawer
        accidentId={accidentDrawerId}
        onClose={() => setAccidentDrawerId(null)}
      />
      <ObserveDrawer
        observeId={observeDrawerId}
        onClose={() => setObserveDrawerId(null)}
      />
    </Box>
  );
};

export default SearchResultMap;

const styles = {
  container: css({
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
  map: css({
    width: "inherit",
    height: "inherit",
  }),
};
