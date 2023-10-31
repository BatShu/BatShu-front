import { Map, MapMarker } from "react-kakao-maps-sdk";
// styles
import { Box, Typography, css } from "@mui/material";
// icons
import { ReactComponent as Frame36 } from "@/presentation/common/icons/outlined/Frame 36.svg";
import { natshuMarker } from "@/presentation/configs";
// components
import DetailChip from "./DetailChip";
import { ILocationDto } from "@/domain/dtos/location";

interface DetailLocationProps {
  location: ILocationDto;
  placeName: string;
}

const DetailLocation = ({ location, placeName }: DetailLocationProps) => {
  const center = { lat: location.y, lng: location.x };

  return (
    <Box css={styles.container}>
      <Box css={styles.top}>
        <Typography className="title">위치 정보</Typography>
        <DetailChip
          Adornment={Frame36}
          text={placeName}
          style={css(`color:#868686;margin:0;`)}
        />
      </Box>

      <Map
        center={center}
        level={1}
        css={styles.map}
        draggable={false}
        disableDoubleClickZoom
      >
        <MapMarker position={center} image={natshuMarker} />
      </Map>
    </Box>
  );
};

export default DetailLocation;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
  }),
  top: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .title": {
      color: "#7B7B7B",
      fontSize: "20px",
      fontWeight: 600,
      letterSpacing: "-0.6px",
    },
  }),
  map: css({
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    marginTop: "10px",
    "& img": { pointerEvents: "none" },
  }),
};
