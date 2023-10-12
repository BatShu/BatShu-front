import { MapMarkerProps } from "react-kakao-maps-sdk";
import { Settings } from "react-slick";
import { SnackbarProviderProps } from "notistack";
import dayjs from "dayjs";
import "dayjs/locale/ko";
// mui
import { Fade } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProviderProps } from "@mui/x-date-pickers/LocalizationProvider";
// images
import MapFlag from "@/presentation/common/icons/asset/map-flag.png";
import CurLocationMImage from "@/presentation/common/icons/asset/cur-location.png";
import NatshuPin from "@/presentation/common/icons/filled/NatshuPin.svg";
import BatshuPin from "@/presentation/common/icons/filled/BatshuPin.svg";

dayjs.locale("ko");

export const snackbarOptions: Omit<SnackbarProviderProps, "children"> = {
  maxSnack: 2,
  autoHideDuration: 1500,
  anchorOrigin: { vertical: "top", horizontal: "center" },
  TransitionComponent: Fade,
};

export const curLocationMarker: MapMarkerProps["image"] = {
  src: CurLocationMImage,
  size: { width: 90, height: 90 },
  options: { offset: { x: 45, y: 45 } },
};

export const natshuMarker: MapMarkerProps["image"] = {
  src: MapFlag,
  size: { width: 100, height: 100 },
  options: { offset: { x: 50, y: 58 } },
};

export const pinMarker: (isBatshu: boolean) => MapMarkerProps["image"] = (
  isBatshu
) => ({
  src: isBatshu ? BatshuPin : NatshuPin,
  size: { width: 40, height: 40 },
  options: { offset: { x: 20, y: 35 } },
});

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

export const MuiDateCalendarOptions: LocalizationProviderProps<any, any> = {
  dateAdapter: AdapterDayjs,
  adapterLocale: "ko",
};

export const DATE_FORMAT_WRITE = "YYYY년 MM월 DD일 ddd요일" as const;
export const DATE_FORMAT_SEARCH = "YYYY-MM-DD" as const;
export const DATE_FORMAT_DETAIL_CHIP = "MM월 D일, HH시";
