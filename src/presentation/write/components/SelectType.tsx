import { useState, useEffect, RefObject } from "react";
import type Slider from "react-slick";
import { enqueueSnackbar } from "notistack";
// styles
import { Box, Typography, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
// icons
import { ReactComponent as SelectLogo } from "@/presentation/common/icons/asset/select-logo.svg";
import CarImage1 from "@/presentation/common/icons/asset/car-image-1.png";
import CarImage2 from "@/presentation/common/icons/asset/car-image-2.png";
// api
import { API } from "@/data/util/fetcher";
import { POST_VIDEO_UPLOAD } from "@/domain/endpoint";
// store
import { useWriteFormContext } from "@/presentation/write/hooks/writeForm";
// types
import { TVideoUploadResponse } from "@/domain/models/appResponse";
// lib
import { TFile, deleteSingleFile } from "@/lib";
// components
import AppButton from "@/presentation/common/components/AppButton";
import Spacer from "@/presentation/common/atoms/Spacer";
import UploadVideo from "./UploadVideo";

interface SelectTypeProps {
  sliderRef: RefObject<Slider>;
}

const SelectType = ({ sliderRef }: SelectTypeProps) => {
  const [videoFile, setVideoFile] = useState<TFile | null>(null);
  const { watch, resetField, setValue } = useWriteFormContext();
  const type = watch("type");
  const valid = type === "사고자" || !!(type === "목격자" && videoFile);

  useEffect(() => {
    (async () => {
      if (!videoFile || !videoFile.file) return;

      const formData = new FormData();
      formData.append("video", videoFile.file);

      const {
        data: { videoId },
      } = await API.POST<TVideoUploadResponse>(POST_VIDEO_UPLOAD, {
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      if (videoId) {
        setValue("content.videoId", videoId[0].id);
      }
    })();
  }, [videoFile, setValue]);

  useEffect(() => {
    if (type === "사고자") deleteSingleFile(setVideoFile);
    resetField("content");
  }, [type, resetField]);

  return (
    <Box>
      <Spacer y={30} />
      <SelectLogo height={122} />
      <Typography css={styles.title}>어떤 도움이 필요하신가요?</Typography>

      <Box css={styles.typeWrapper}>
        <Box
          css={styles.imgWrapper(type === "사고자")}
          onClick={() => setValue("type", "사고자")}
        >
          <img src={CarImage1} style={{ paddingTop: "17px" }} />
          <Box css={styles.textWrap}>
            <Typography css={styles.type}>사고자</Typography>
            <Typography css={styles.caption}>영상을 찾고있어요!</Typography>
          </Box>
        </Box>

        <Box
          css={styles.imgWrapper(type === "목격자")}
          onClick={() => setValue("type", "목격자")}
        >
          <img src={CarImage2} />
          <Box css={styles.textWrap}>
            <Typography css={styles.type}>목격자</Typography>
            <Typography css={styles.caption}>사고를 목격했어요!</Typography>
          </Box>
        </Box>
      </Box>

      <Spacer y={32} />

      {type === "목격자" && (
        <UploadVideo valid={valid} setVideoFile={setVideoFile} />
      )}

      <AppButton
        disabled={!valid}
        css={styles.button}
        onClick={() => {
          if (!valid) {
            enqueueSnackbar("파일을 첨부해 주세요!");
            return;
          }
          sliderRef.current?.slickGoTo(1);
        }}
      >
        선택완료
      </AppButton>
    </Box>
  );
};

export default SelectType;

const styles = {
  title: css({
    fontSize: "20px",
    fontWeight: 600,
    margin: "24px 0",
  }),
  typeWrapper: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  }),
  imgWrapper: (selected: boolean) =>
    css({
      display: "flex",
      position: "relative",
      flexDirection: "column",
      alignItems: "center",
      width: "48%",
      aspectRatio: "1/1.2",
      padding: "0 16px",
      cursor: "pointer",
      backgroundColor: "#fff",
      borderRadius: "8px",
      textAlign: "center",
      border: selected ? "2px solid #ccc" : 0,
      "& img": { width: "100%" },
    }),
  textWrap: css({ position: "absolute", bottom: 20 }),
  type: css({ fontSize: "20px", fontWeight: 700 }),
  caption: css({ fontSize: "12px", color: "#7B7B7B" }),
  button: css({
    position: "absolute",
    width: "100%",
    bottom: 28,
    left: 0,
    fontSize: "20px",
    color: "#fff",
  }),
} satisfies CssObject;
