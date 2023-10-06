import { useRef, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
// styles
import { Box, InputAdornment, css } from "@mui/material";
import { pageContentStyles, svgFill } from "../common/styles/pageStyles";
import { CssObject } from "../common/styles/types";
// store
import { locationStore } from "@/store/locationStore";
// constants
import { SEARCH_PATH } from "@/domain/paths";
// icons
import { ReactComponent as AddIcon } from "@/presentation/common/icons/outlined/Add.svg";
import { ReactComponent as MinusIcon } from "@/presentation/common/icons/outlined/Minus.svg";
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
import { ReactComponent as Situation1Icon } from "@/presentation/common/icons/outlined/Situation 1.svg";
// components
import Splash from "../common/layout/Splash";
import KakaoMap from "./components/KakaoMap";
import { AppTextField } from "../common/components/AppTextField";
import Spacer from "../common/atoms/Spacer";
import { AccidentToggleButton } from "./components/AccidentToggleButton";
import { AppIconButton } from "../common/components/AppIconButton";
import { AccidentButton } from "./components/AccidentButton";
import { AppBottomNavigationBar } from "../common/components/AppBottmNaviationBar";

export const HomePage = (): ReactElement => {
  const {
    location,
    status: { loading },
  } = locationStore();

  const mapRef = useRef<kakao.maps.Map>(null);
  const navigate = useNavigate();

  const goCenter = () => {
    if (!mapRef.current) return;

    mapRef.current.setLevel(4);
    mapRef.current.panTo(new kakao.maps.LatLng(location.y, location.x));
  };

  const zoomMap = (isPlus: boolean) => {
    if (!mapRef.current) return;
    const curLevel = mapRef.current.getLevel();

    mapRef.current.setLevel(curLevel + (isPlus ? -1 : 1), { animate: true });
  };

  //useReadAccidentsByLocation(1, 1, 1);
  return (
    <Box css={styles.pageWrapper}>
      <Splash />

      <KakaoMap location={location} loading={loading} ref={mapRef} />

      <Box css={[pageContentStyles, svgFill]}>
        <Box css={styles.topMenu}>
          <AppTextField
            placeholder={"무엇을 봣슈~?"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    css={css`
                      color: var(--icon-color);
                    `}
                  />
                </InputAdornment>
              ),
              readOnly: true,
            }}
            css={styles.input}
            onClick={() => navigate(SEARCH_PATH)}
          />
          <Box>
            <AccidentButton />
            <Spacer y={12} />
            <AccidentToggleButton />
          </Box>
        </Box>
        <Box css={styles.bottomMenu}>
          <Box css={styles.menuBar}>
            <Box css={styles.menuButton}>
              <AppIconButton size="medium" onClick={goCenter}>
                <Situation1Icon />
              </AppIconButton>

              <Box css={styles.zoom}>
                <AppIconButton size="small" onClick={() => zoomMap(true)}>
                  <AddIcon />
                </AppIconButton>
                <Spacer y={10} />
                <AppIconButton size="small" onClick={() => zoomMap(false)}>
                  <MinusIcon />
                </AppIconButton>
              </Box>
            </Box>
            <AppBottomNavigationBar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles: CssObject = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
  }),
  topMenu: css({
    display: "flex",
    justifyContent: "space-between",
  }),
  input: css({
    width: "85%",
    height: "44px",
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
  menuButton: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  }),
  zoom: css({ display: "flex", flexDirection: "column" }),
};
