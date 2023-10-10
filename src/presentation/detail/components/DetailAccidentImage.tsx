import { Swiper, SwiperSlide } from "swiper/react";
// styles
import { css } from "@mui/material";
// types
import type { dummyDetail } from "../../home/temp";
// components
import SkeletonImage from "@/presentation/common/atoms/SkeletonImage";

interface DetailAccidentImageProps {
  photos: (typeof dummyDetail)["photos"];
}

const DetailAccidentImage = ({ photos }: DetailAccidentImageProps) => {
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
          <SkeletonImage src={url} imgCss={styles.accidentImage} />
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
  accidentImage: css({
    width: "100%",
    height: "unset",
    aspectRatio: "1",
    borderRadius: "8px",
  }),
};
