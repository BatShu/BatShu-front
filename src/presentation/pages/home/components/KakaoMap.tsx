import { ForwardedRef, forwardRef } from "react";
import { Map } from "react-kakao-maps-sdk";
// styles
import { Box, CircularProgress, Typography, css } from "@mui/material";
import { CssObject } from "../../../common/styles/types";

interface KakaoMapProps {
  location: { lat: number; lng: number };
  loading: boolean;
}

const KakaoMap = (
  { location, loading }: KakaoMapProps,
  mapRef: ForwardedRef<kakao.maps.Map>
) => {
  return (
    <Box css={styles.loadingPage}>
      {loading ? (
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
          css={styles.map}
          isPanto
          ref={mapRef}
        ></Map>
      )}
    </Box>
  );
};

export default forwardRef(KakaoMap);

const styles: CssObject = {
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
