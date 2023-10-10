import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// styles
import { Skeleton, css } from "@mui/material";
// types
import type { dummyDetail } from "../../home/temp";

interface DetailAccidentImageProps {
  photos: (typeof dummyDetail)["photos"];
}

const DetailAccidentImage = ({ photos }: DetailAccidentImageProps) => {
  const [load, setLoad] = useState(false);

  return (
    <Swiper
      slidesPerView={2.5}
      spaceBetween={10}
      css={styles.swiper}
      loop={false}
      direction="horizontal"
    >
      {photos.map((url, idx) => (
        <SwiperSlide key={`${url}${idx}`}>
          <Skeleton variant="rectangular" css={styles.accidentImage(!load)} />
          <img
            src={url}
            css={styles.accidentImage(load)}
            onLoad={() => setLoad(true)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DetailAccidentImage;

const styles = {
  swiper: css({
    paddingTop: "20px !important",
    "& .swiper-wrapper": { width: "100%" },
  }),
  accidentImage: (load: boolean) =>
    css({
      width: "100%",
      height: "unset",
      aspectRatio: "1",
      borderRadius: "8px",
      ...(!load && { display: "none" }),
    }),
};
