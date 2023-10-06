import {
  useState,
  useEffect,
  useCallback,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// styles
import { css } from "@emotion/react";
import { Box, InputAdornment } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { natshuMarker } from "@/presentation/configs";
// hooks
import useKakaoMapSearch from "@/hooks/useKakaoMapSearch";
// store
import { ILocation, locationStore } from "@/store/locationStore";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
// components
import { AppTextField } from "@/presentation/common/components/AppTextField";
import AppButton from "@/presentation/common/components/AppButton";
import PlaceResult from "./PlaceResult";

interface SearchMapProps {
  setShowMap?: Dispatch<SetStateAction<boolean>>;
  center?: ILocation | null;
  setPlace?: Dispatch<
    SetStateAction<kakao.maps.services.PlacesSearchResultItem | null>
  >;
  setMarkerPosition?: Dispatch<SetStateAction<ILocation | null>>;
  setLevel?: Dispatch<SetStateAction<number>>;
  checked?: boolean;
  onComplete: (params?: any) => void;
}

const SearchMap = (props: SearchMapProps) => {
  const {
    setShowMap,
    center,
    setPlace,
    setMarkerPosition,
    setLevel,
    checked = false,
    onComplete,
  } = props;

  const { location } = locationStore();
  const curCenter = center || location;

  const [keyword, setKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [curPlace, setCurPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
  const [curMarkerPosition, setCurMarkerPosition] = useState<ILocation | null>(
    checked ? curCenter : null
  );

  const mapRef = useRef<kakao.maps.Map>(null);

  const { data: result } = useKakaoMapSearch(keyword);

  const updatePlace = useCallback(() => {
    if (!setPlace || !curPlace || !mapRef.current) return;

    setKeyword(curPlace.place_name);
    setShowResults(false);

    const lat = Number(curPlace.y);
    const lng = Number(curPlace.x);

    const position = new kakao.maps.LatLng(lat, lng);
    setCurMarkerPosition({ lat, lng });

    mapRef.current.setLevel(1);
    mapRef.current.panTo(position);
    setPlace?.(curPlace);
  }, [curPlace, setPlace]);

  const updateMarker = useCallback(() => {
    if (!setMarkerPosition) return;
    setMarkerPosition(curMarkerPosition);
  }, [curMarkerPosition, setMarkerPosition]);

  useEffect(() => {
    if (!mapRef.current) return;

    updatePlace();
    updateMarker();
    setLevel?.(mapRef.current.getLevel());
  }, [updatePlace, updateMarker, setLevel]);

  return (
    <Box css={styles.container}>
      <Box css={pageContentStyles}>
        {setShowMap && (
          <Left1
            onClick={() => setShowMap(false)}
            css={css(`cursor:pointer;z-index:4;margin-bottom:10px`)}
          />
        )}

        <AppTextField
          value={keyword}
          onChange={({ target: { value } }) => {
            setKeyword(value);
            setShowResults(true);
          }}
          placeholder="정확한 사고 장소에 핀을 찍어주세요!"
          css={styles.input}
          sx={{ boxShadow: 1 }}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter" && result) setCurPlace(result[0]);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  css={css`
                    color: var(--icon-color);
                  `}
                />
                {keyword && showResults && result && (
                  <PlaceResult data={result} setPlace={setCurPlace} top={50} />
                )}
              </InputAdornment>
            ),
          }}
        />

        <Map
          center={curCenter}
          level={3}
          onClick={(_, { latLng }) =>
            setCurMarkerPosition({
              lat: latLng.getLat(),
              lng: latLng.getLng(),
            })
          }
          css={styles.map}
          ref={mapRef}
        >
          {curMarkerPosition && (
            <MapMarker position={curMarkerPosition} image={natshuMarker} />
          )}
        </Map>
        <AppButton
          disabled={!curMarkerPosition}
          onClick={() => {
            onComplete();
            setShowMap?.(false);
          }}
          css={styles.button}
        >
          확인
        </AppButton>
      </Box>
    </Box>
  );
};

export default SearchMap;

const styles: CssObject = {
  container: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "var(--background)",
  }),
  input: css({ height: "40px", zIndex: 4 }),
  map: css({
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 3,
    "& img": { pointerEvents: "none" },
  }),
  button: css({
    position: "absolute",
    width: "90%",
    bottom: 36,
    left: "50%",
    transform: "translateX(-50%)",
    color: "#fff",
    zIndex: 4,
  }),
};
