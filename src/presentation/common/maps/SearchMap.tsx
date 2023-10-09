import { useState, useCallback, useRef, Dispatch, SetStateAction } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
// styles
import { css } from "@emotion/react";
import { Container, InputAdornment, Modal } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";
import { natshuMarker } from "@/presentation/configs";
// hooks
// store
import { locationStore } from "@/store/locationStore";
import { ILocation, TPlace } from "@/domain/models/location";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
// components
import { AppTextField } from "@/presentation/common/components/AppTextField";
import AppButton from "@/presentation/common/components/AppButton";
import PlaceResult from "./PlaceResult";

interface SearchMapProps {
  setShowMap?: Dispatch<SetStateAction<boolean>>;
  curLocation: ILocation | null;
  onLocationSelected: (value: ILocation | null) => void;
  checked?: boolean;
}

const SearchMap = (props: SearchMapProps) => {
  const { setShowMap, curLocation, onLocationSelected } = props;

  const { location: gLocation } = locationStore();
  const [curCenter, setCurCenter] = useState<ILocation>(
    curLocation ?? gLocation
  );

  const [keyword, setKeyword] = useState("");
  const [checked, setChecked] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const mapRef = useRef<kakao.maps.Map>(null);

  const updatePlace = useCallback(
    (newPlace: TPlace) => {
      if (!mapRef.current) return;

      setShowResults(false);

      const lat = Number(newPlace.y);
      const lng = Number(newPlace.x);

      const position = new kakao.maps.LatLng(lat, lng);
      setCurCenter({
        lat: lat,
        lng: lng,
        level: mapRef.current.getLevel(),
        place: newPlace,
      });
      setChecked(true);
      mapRef.current.setLevel(1);
      mapRef.current.panTo(position);
    },
    [setShowResults, setCurCenter]
  );

  const handleUpdateLocation = useCallback(
    (latLng: kakao.maps.LatLng) => {
      setCurCenter({
        lat: latLng.getLat(),
        lng: latLng.getLng(),
        level: mapRef.current?.getLevel() ?? 3,
        place: null,
      });
      setChecked(true);
    },
    [setCurCenter]
  );

  const handleLocationSearchComplete = useCallback(() => {
    setShowMap?.(false);
    onLocationSelected(curCenter);
  }, [setShowMap, onLocationSelected, curCenter]);
  return (
    <Modal css={styles.container} open>
      <Container
        css={[pageContentStyles, styles.content]}
        maxWidth={"xs"}
        fixed
        disableGutters
      >
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
          // onKeyDown={(e) => {
          //   if (e.nativeEvent.isComposing) return;
          //   if (e.key === "Enter" && result) setCurPlace(result[0]);
          // }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  css={css`
                    color: var(--icon-color);
                  `}
                />
                {keyword && showResults && (
                  <PlaceResult
                    keyword={keyword}
                    onPlaceSelected={(newPlace) => {
                      if (newPlace == null) return;
                      updatePlace(newPlace);
                    }}
                    top={50}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />

        <Map
          center={curCenter}
          level={3}
          onClick={(_, { latLng }) => handleUpdateLocation(latLng)}
          css={styles.map}
          ref={mapRef}
        >
          {curCenter && checked && (
            <MapMarker position={curCenter} image={natshuMarker} />
          )}
        </Map>
        <AppButton
          disabled={!gLocation || !checked}
          onClick={handleLocationSearchComplete}
          css={styles.button}
        >
          확인
        </AppButton>
      </Container>
    </Modal>
  );
};

export default SearchMap;

const styles: CssObject = {
  container: css({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 4,
    backgroundColor: "var(--background)",
  }),
  content: css({
    position: "relative",
    width: "100%",
    height: "100%",
    zIndex: 4,
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
