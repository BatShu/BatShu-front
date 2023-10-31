import { useState, useRef, ReactElement } from "react";
// styles
import { Box, css } from "@mui/material";
import { pageContentStyles } from "../common/styles/pageStyles";
// components
import Splash from "../common/layout/Splash";
import HomeMap from "./components/HomeMap";
import HomeHeader from "./components/HomeHeader";
import HomeBottomUtil from "./components/HomeBottomUtil";
import AppNavigationBar from "../common/components/AppNaviationBar";

export const HomePage = (): ReactElement => {
  const [isBatshu, setIsBatshu] = useState(false);

  const mapRef = useRef<kakao.maps.Map>(null);

  //useReadAccidentsByLocation(1, 1, 1);
  return (
    <Box css={styles.pageWrapper}>
      <Splash />

      <HomeMap ref={mapRef} isBatshu={isBatshu} />

      <Box css={pageContentStyles}>
        <HomeHeader isBatshu={isBatshu} setIsBatshu={setIsBatshu} />

        <Box css={styles.bottomMenu}>
          <Box css={styles.menuBar}>
            <HomeBottomUtil mapRef={mapRef} />

            <AppNavigationBar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
  }),
  bottomMenu: css({
    position: "relative",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    "& * > button": { pointerEvents: "auto" },
  }),
  menuBar: css({
    position: "absolute",
    width: "100%",
    bottom: "36px",
    left: 0,
  }),
};
