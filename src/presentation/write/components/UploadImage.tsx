import { useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Controller } from "react-hook-form";
// styles
import { Box, Typography, css, Zoom } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
// icons
import { ReactComponent as AddSquare } from "@/presentation/common/icons/outlined/Add Square.svg";
import { ReactComponent as MinusCircle } from "@/presentation/common/icons/outlined/Minus Circle.svg";
// store
import { useWriteFormContext } from "@/presentation/write/hooks/writeForm";
import { TFile, setMultipleFile } from "@/lib";

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

  const { watch, setValue, control, trigger } = useWriteFormContext();
  const images = watch("content.photos");
  const onDelete = useCallback(
    (delIdx: number) =>
      setValue(
        "content.photos",
        images.filter(({ url }, idx) => {
          if (idx !== delIdx) return true;
          else if (inputRef.current) {
            inputRef.current.value = "";
            URL.revokeObjectURL(url);
            return false;
          }
        }),
        { shouldValidate: true }
      ),
    [setValue, images]
  );

  return (
    <Box css={styles.container}>
      <Swiper
        slidesPerView={3.5}
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
            <Controller
              control={control}
              name="content.photos"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  ref={inputRef}
                  onChange={(e) =>
                    setMultipleFile(e, (newImages: TFile[]) => {
                      onChange(images.concat(newImages).slice(0, 5));
                      trigger("content.photos");
                    })
                  }
                />
              )}
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
    width: "100%",
    "& .swiper-wrapper": { paddingTop: "10px" },
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
    right: 0,
    cursor: "pointer",
    ":hover": {
      transform: "scale(1.08)",
    },
  }),
};
