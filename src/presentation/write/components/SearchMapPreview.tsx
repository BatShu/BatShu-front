import { AppTextField } from "@/presentation/common/components/AppTextField";
import SearchMap from "@/presentation/common/maps/SearchMap";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { natshuMarker } from "@/presentation/configs";
import { ILocation } from "@/store/locationStore";
import { InputAdornment, css } from "@mui/material";
import { ReactElement, useState } from "react";
import { ReactComponent as Frame36 } from "@/presentation/common/icons/outlined/Frame 36.svg";
interface SearchMapPreviewProps {
  value: ILocation | null;
  onChange: (value: ILocation | null) => void;
}
export const SearchMapPreview = ({
  value,
  onChange,
}: SearchMapPreviewProps): ReactElement => {
  const [showMap, setShowMap] = useState(false);
  const selectLocation = (newLocation: ILocation | null) => {
    onChange(newLocation);
  };
  return (
    <>
      {showMap && (
        <SearchMap
          curLocation={value}
          onLocationSelected={selectLocation}
          setShowMap={setShowMap}
        />
      )}
      <AppTextField
        placeholder="사고가 발생한 위치를 알려주세요!"
        onClick={() => setShowMap(true)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Frame36 />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        sx={{ cursor: "pointer" }}
      />
      {value && (
        <Map
          center={value}
          level={value.level}
          css={styles.map}
          draggable={false}
          disableDoubleClickZoom
        >
          <MapMarker position={value} image={natshuMarker} />
        </Map>
      )}
    </>
  );
};

const styles = {
  map: css({
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    marginTop: "10px",
    "& img": { pointerEvents: "none" },
  }),
};
