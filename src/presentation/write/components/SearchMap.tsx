import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
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
import { useWriteFormContext } from "@/presentation/write/hooks/writeForm";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
// components
import { AppTextField } from "@/presentation/common/components/AppTextField";
import PlaceResult from "../../search/components/PlaceResult";
import AppButton from "@/presentation/common/components/AppButton";

interface SearchMapProps {
  setShowMap: Dispatch<SetStateAction<boolean>>;
}

const SearchMap = ({ setShowMap }: SearchMapProps) => {
  const { watch, setValue } = useWriteFormContext();
  const content = watch("content");
  const { location } = locationStore();

  const [keyword, setKeyword] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [place, setPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
  const [markerPosition, setMarkerPosition] = useState<ILocation | null>(
    content.location
  );

  const mapRef = useRef<kakao.maps.Map>(null);
  const { data: result } = useKakaoMapSearch(keyword);

  useEffect(() => {
    if (!place || !mapRef.current) return;
    setKeyword(place.place_name);
    setShowResults(false);

    const lat = Number(place.y);
    const lng = Number(place.x);

    const position = new kakao.maps.LatLng(lat, lng);
    setMarkerPosition({ lat, lng });

    mapRef.current.setLevel(1);
    mapRef.current.panTo(position);
  }, [place]);

  const onClick = () => {
    if (!markerPosition) return;
    setValue("content.location", markerPosition);
    setShowMap(false);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    setValue("content.mapLevel", mapRef.current.getLevel());
  }, [markerPosition, setValue]);

  return (
    <Box css={styles.container}>
      <Box css={pageContentStyles}>
        <Left1
          onClick={() => setShowMap(false)}
          css={css(`cursor:pointer;z-index:4;margin-bottom:10px`)}
        />

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
            if (e.key === "Enter" && result) setPlace(result[0]);
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
                  <PlaceResult data={result} setPlace={setPlace} top={50} />
                )}
              </InputAdornment>
            ),
          }}
        />

        <Map
          center={content.location || location}
          level={content.mapLevel}
          onClick={(_, { latLng }) =>
            setMarkerPosition({
              lat: latLng.getLat(),
              lng: latLng.getLng(),
            })
          }
          css={styles.map}
          ref={mapRef}
        >
          {markerPosition && (
            <MapMarker position={markerPosition} image={natshuMarker} />
          )}
        </Map>
        <AppButton
          onClick={onClick}
          backgroundcolor={markerPosition ? "#000" : "#bbb"}
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
