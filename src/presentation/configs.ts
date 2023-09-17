import { Fade } from "@mui/material";
import { SnackbarProviderProps } from "notistack";
import { MapMarkerProps } from "react-kakao-maps-sdk";
import { Settings } from "react-slick";
import Natshu from "@/presentation/common/icons/asset/Group 196.png";

export const snackbarOptions: Omit<SnackbarProviderProps, "children"> = {
  maxSnack: 2,
  autoHideDuration: 1500,
  anchorOrigin: { vertical: "top", horizontal: "center" },
  TransitionComponent: Fade,
};

export const natshuMarker: MapMarkerProps["image"] = {
  src: Natshu,
  size: {
    width: 100,
    height: 100,
  },
  options: {
    offset: { x: 50, y: 58 },
  },
};

export const sliderSettings: Settings = {
  arrows: false,
  accessibility: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  swipe: false,
  infinite: false,
  dots: false,
  lazyLoad: "anticipated",
};

export const DATE_FORMAT = "YYYY년 MM월 DD일 ddd요일" as const;
