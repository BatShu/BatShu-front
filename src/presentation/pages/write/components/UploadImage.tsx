import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// styles
import { Box, Typography, css, Zoom } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
// icons
import { ReactComponent as AddSquare } from "@/presentation/common/icons/outlined/Add Square.svg";
import { ReactComponent as MinusCircle } from "@/presentation/common/icons/outlined/Minus Circle.svg";
// store
import { useWriteFormContext } from "@/store/writeForm";

interface ImageBoxProps {
  src: string;
  onDelete?: () => void;
}

const ImageBox = ({ src, onDelete }: ImageBoxProps) => {
  return (
    <>
      <img src={src} alt={src} />
      {onDelete && <MinusCircle css={styles.delete} onClick={onDelete} />}
    </>
  );
};

const UploadImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, watch, setValue } = useWriteFormContext();
  const images = watch("content.images");
  const onDelete = useCallback(
    (delIdx: number) =>
      setValue(
        "content.images",
        images.filter((_, idx) => {
          return idx !== delIdx;
        })
      ),
    [setValue, images]
  );

  return (
    <Box css={styles.container}>
      <Swiper
        slidesPerView={4.2}
        spaceBetween={10}
        css={styles.swiper}
        loop={false}
      >
        <SwiperSlide>
          <Box
            css={[styles.input, styles.box]}
            onClick={() => inputRef.current?.click()}
          >
            <AddSquare css={styles.addSquare} />

            <Typography css={styles.text}>
              {images.length ? `${images.length}/5` : "사진 첨부"}
            </Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              {...register("content.images")}
            />
          </Box>
        </SwiperSlide>

        {images.map(({ url }, idx) => (
          <SwiperSlide key={`${url}${idx}`}>
            <Zoom in>
              <Box css={styles.box}>
                <ImageBox src={url} onDelete={() => onDelete(idx)} />
              </Box>
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default UploadImage;

const styles: CssObject = {
  container: css({
    display: "flex",
    alignItems: "center",
    color: "#7B7B7B",
    "& path": { fill: "#7B7B7B" },
    "& *": { transition: "all ease 0.15s" },
  }),
  swiper: css({
    display: "flex",
    overflow: "hidden",
    padding: "20px 5px 0 0",
    touchAction: "none",
    width: "100%",
    "& .swiper-wrapper": {
      display: "flex",
      alignItems: "center",
    },
  }),
  input: css({ cursor: "pointer" }),
  box: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
    aspectRatio: "1",
    borderRadius: "8px",
    backgroundColor: "#fff",
    "& img": {
      width: "100%",
      height: "100%",
      borderRadius: "8px",
      objectFit: "contain",
    },
  }),
  addSquare: css({ margin: "10px 0 3px 0" }),
  text: css({ fontSize: "12px", fontWeight: 500 }),
  delete: css({
    position: "absolute",
    width: 18,
    top: -10,
    right: -5,
    cursor: "pointer",
    ":hover": {
      transform: "scale(1.08)",
    },
  }),
};
