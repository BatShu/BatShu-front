import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
// styles
import { Grid, Typography } from "@mui/material";
import { css } from "@emotion/react";
import { CssObject } from "@/presentation/common/styles/types";

interface CustomTimePickerProps {
  onChange: (param?: any) => void;
  loop?: boolean;
  resetKey?: any;
  ampmInitialValue?: "오전" | "오후";
  timeInitialValue?: number;
}

const CustomTimePicker = ({
  onChange,
  loop = false,
  resetKey,
  ampmInitialValue = "오전",
  timeInitialValue = 8,
}: CustomTimePickerProps) => {
  const [ampmValue, setAmPmValue] = useState((ampmInitialValue = "오전"));
  const [timeValue, setTimeValue] = useState(timeInitialValue);

  const ampmRef = useRef<SwiperRef>(null);
  const timeRef = useRef<SwiperRef>(null);

  const ampm = ["오전", "오후"];
  const times = new Array(13).fill(0).map((v, i) => (v = v + i));

  useEffect(() => {
    const timeTo24 = timeValue + (ampmValue === "오전" ? 0 : 12);
    onChange(timeTo24);
  }, [ampmValue, timeValue, onChange]);

  useEffect(() => {
    if (!resetKey) return;

    ampmRef.current?.swiper.slideTo(ampmInitialValue === "오전" ? 0 : 1);
    timeRef.current?.swiper.slideTo(timeInitialValue);
    onChange(timeInitialValue + (ampmInitialValue === "오전" ? 0 : 12));
  }, [resetKey, onChange, ampmInitialValue, timeInitialValue]);

  const isAm = ampmValue === "오전";

  return (
    <Grid container css={styles.container}>
      <Grid item xs={4}>
        <Swiper
          direction="vertical"
          slideToClickedSlide
          centeredSlides
          slidesPerView={3}
          css={styles.swiper}
          defaultValue={ampm[0]}
          initialSlide={ampm.findIndex((v) => v === ampmInitialValue)}
          onSlideChange={({ realIndex }) => {
            const value = ampm[realIndex];
            setTimeValue((prev) => prev + (value === "오후" ? 1 : -1));
            setAmPmValue(ampm[realIndex]);
          }}
          scrollbar
          ref={ampmRef}
        >
          {ampm.map((time) => (
            <SwiperSlide key={time}>
              <Typography css={styles.text}>{time}</Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={4}>
        <Swiper
          direction="vertical"
          slideToClickedSlide
          centeredSlides
          slidesPerView={3}
          initialSlide={timeInitialValue}
          css={styles.swiper}
          loop={loop}
          defaultValue={times[0]}
          onSlideChange={({ realIndex }) =>
            setTimeValue(times[isAm ? realIndex : realIndex + 1])
          }
          ref={timeRef}
        >
          {(isAm ? times.slice(0, 12) : times.slice(1)).map((time) => (
            <SwiperSlide key={time}>
              <Typography>{time}</Typography>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={2}>
        <Typography css={styles.text}>시</Typography>
      </Grid>
    </Grid>
  );
};

export default CustomTimePicker;

const styles: CssObject = {
  container: css({
    alignItems: "center",
    touchAction: "none",
    "*": { transition: "all ease 0.2s" },
    "& .swiper-swiper": {
      width: "50%",
    },
  }),
  swiper: css({
    height: "100px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    "& .swiper-slide": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      "& p": { color: "#C1C1C1", fontSize: "10px" },
    },
    "& .swiper-slide-active": {
      "& p": { color: "#000", fontSize: "14px", fontWeight: 700 },
      border: "1px solid #CCC",
      borderLeft: 0,
      borderRight: 0,
    },
  }),
  text: css({ color: "#808080", fontWeight: 600 }),
};
