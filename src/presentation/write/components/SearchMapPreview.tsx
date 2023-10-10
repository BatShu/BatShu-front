import { AppTextField } from "@/presentation/common/components/AppTextField";
import SearchMap from "@/presentation/common/maps/SearchMap";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { natshuMarker } from "@/presentation/configs";
import { ILocation } from "@/domain/models/location";
import { InputAdornment, css } from "@mui/material";
import { ReactElement, useState } from "react";
import { ReactComponent as Frame36 } from "@/presentation/common/icons/outlined/Frame 36.svg";
import { useKakaoMapAddressSearch } from "@/hooks/useKakaoMapSearch";
import InputChip from "@/presentation/common/atoms/InputChip";
interface SearchMapPreviewProps {
  location: ILocation | null;
  onLocationChange: (value: ILocation | null) => void;
}
export const SearchMapPreview = ({
  location,
  onLocationChange: onChange,
}: SearchMapPreviewProps): ReactElement => {
  const [showMap, setShowMap] = useState(false);
  const selectLocation = (newLocation: ILocation | null) => {
    onChange(newLocation);
  };

  const { data: address } = useKakaoMapAddressSearch(location);
  return (
    <>
      {showMap && (
        <SearchMap
          curLocation={location}
          onLocationSelected={selectLocation}
          setShowMap={setShowMap}
        />
      )}

      <AppTextField
        placeholder={location == null ? "사고가 발생한 위치를 알려주세요!" : ""}
        onClick={() => setShowMap(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {location != null && (
                <InputChip
                  text={
                    location?.place == null
                      ? `${address?.address_name}`
                      : location?.place?.place_name
                  }
                />
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Frame36 />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        sx={{ cursor: "pointer" }}
      />
      {location && (
        <Map
          center={location}
          level={location.level}
          css={styles.map}
          draggable={false}
          disableDoubleClickZoom
        >
          <MapMarker position={location} image={natshuMarker} />
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
