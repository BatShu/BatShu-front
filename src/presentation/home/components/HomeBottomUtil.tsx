import { RefObject } from "react";
// styles
import { Box, css } from "@mui/material";
// icons
import { ReactComponent as AddIcon } from "@/presentation/common/icons/outlined/Add.svg";
import { ReactComponent as MinusIcon } from "@/presentation/common/icons/outlined/Minus.svg";
import { ReactComponent as Situation1Icon } from "@/presentation/common/icons/outlined/Situation 1.svg";
// store
import { locationStore } from "@/store/locationStore";
// components
import Spacer from "@/presentation/common/atoms/Spacer";
import { AppIconButton } from "@/presentation/common/components/AppIconButton";

interface HomeBottomUtilProps {
  mapRef: RefObject<kakao.maps.Map>;
}

const HomeBottomUtil = ({ mapRef }: HomeBottomUtilProps) => {
  const { location } = locationStore();

  const goToUserPosition = () => {
    if (!mapRef.current) return;

    mapRef.current.setLevel(2);
    mapRef.current.panTo(new kakao.maps.LatLng(location.lat, location.lng));
  };

  const zoomMap = (isPlus: boolean) => {
    if (!mapRef.current) return;
    const curLevel = mapRef.current.getLevel();

    mapRef.current.setLevel(curLevel + (isPlus ? -1 : 1), { animate: true });
  };

  return (
    <Box css={styles.menuButton}>
      <AppIconButton size="medium" onClick={goToUserPosition}>
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
  );
};

export default HomeBottomUtil;

const styles = {
  menuButton: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  }),
  zoom: css({ display: "flex", flexDirection: "column" }),
};
