import { RefObject } from "react";
import type Slider from "react-slick";
import { enqueueSnackbar } from "notistack";
// styles
import { Box, Typography, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
// icons
import { ReactComponent as Group244 } from "@/presentation/common/icons/asset/Group 244.svg";
import CarImage1 from "@/presentation/common/icons/asset/car image1.png";
import CarImage2 from "@/presentation/common/icons/asset/car image 2.png";
// store
import { writeFormStore } from "@/store/writeFormStore";
// components
import AppButton from "@/presentation/common/components/AppButton";
import Spacer from "@/presentation/common/atoms/Spacer";
import UploadVideo from "./UploadVideo";

interface SelectTypeProps {
  sliderRef: RefObject<Slider>;
}

const SelectType = ({ sliderRef }: SelectTypeProps) => {
  const { type, content, setType } = writeFormStore();

  const valid = type === "사고자" || !!(type === "목격자" && content.video);

  const border = (selected: boolean) =>
    css(selected ? "border:2px solid #ccc" : "");

  return (
    <Box>
      <Spacer y={30} />
      <Group244 height={122} />
      <Typography css={styles.title}>어떤 도움이 필요하신가요?</Typography>

      <Box css={styles.typeWrapper}>
        <Box
          css={[styles.imgWrapper, border(type === "사고자")]}
          onClick={() => setType("사고자")}
        >
          <img src={CarImage1} style={{ paddingTop: "17px" }} />
          <Box css={styles.textWrap}>
            <Typography css={styles.type}>사고자</Typography>
            <Typography css={styles.caption}>영상을 찾고있어요!</Typography>
          </Box>
        </Box>

        <Box
          css={[styles.imgWrapper, border(type === "목격자")]}
          onClick={() => setType("목격자")}
        >
          <img src={CarImage2} />
          <Box css={styles.textWrap}>
            <Typography css={styles.type}>목격자</Typography>
            <Typography css={styles.caption}>사고를 목격했어요!</Typography>
          </Box>
        </Box>
      </Box>

      <Spacer y={32} />

      {type === "목격자" && <UploadVideo />}

      <AppButton
        backgroundcolor={valid ? "#000" : "#bbb"}
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

const styles: CssObject = {
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
  imgWrapper: css({
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
};
