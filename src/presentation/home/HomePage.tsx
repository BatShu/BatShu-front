import { useRef, ReactElement } from "react";
// styles
import { Box, InputAdornment, css } from "@mui/material";
import { pageContentStyles } from "../common/styles/pageStyles";
import { CssObject } from "../common/styles/types";
// hooks
import useUserLocation from "@/hook/useUserLocation";
// components
import KakaoMap from "../common/temp/KakaoMap";
import { AppTextField } from "../common/components/AppTextField";
import { ReactComponent as SearchIcon } from "@/presentation/common/icons/outlined/Search 1.svg";
import { AccidentToggleButton } from "./components/AccidentToggleButton";
import { AppIconButton } from "../common/components/AppIconButton";
import { ReactComponent as Situation1Icon } from "@/presentation/common/icons/outlined/Situation 1.svg";
import { AccidentButton } from "./components/AccidentButton";
import { ReactComponent as AddIcon } from "@/presentation/common/icons/outlined/Add.svg";
import { ReactComponent as MinusIcon } from "@/presentation/common/icons/outlined/Minus.svg";
import { AppBottomNavigationBar } from "../common/components/AppBottmNaviationBar";

export const HomePage = (): ReactElement => {
  const {
    location,
    status: { loading },
  } = useUserLocation();

  const mapRef = useRef<kakao.maps.Map>(null);

  const goCenter = () => {
    if (!mapRef.current) return;

    mapRef.current.setLevel(4);
    mapRef.current.panTo(new kakao.maps.LatLng(location.lat, location.lng));
  };

  return (
    <Box css={styles.pageWrapper}>
      <KakaoMap location={location} loading={loading} ref={mapRef} />

      <Box css={pageContentStyles}>
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
            }}
            css={styles.input}
          />
          <Box>
            <AccidentButton />
            <AccidentToggleButton sx={{ mt: "12px" }} />
          </Box>
        </Box>

        <Box css={styles.bottomMenu}>
          <Box css={styles.menuBar}>
            <Box css={styles.menuButton}>
              <AppIconButton size="medium" onClick={goCenter}>
                <Situation1Icon />
              </AppIconButton>

              <Box css={styles.zoom}>
                <AppIconButton size="small">
                  <AddIcon />
                </AppIconButton>
                <AppIconButton size="small" sx={{ mt: "10px" }}>
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
    display: "flex",
    justifyContent: "center",
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
    bottom: 0,
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
