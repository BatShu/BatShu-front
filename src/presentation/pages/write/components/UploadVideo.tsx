import { useRef } from "react";
// styles
import { Box, Typography, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
// icons
import { ReactComponent as Upload } from "@/presentation/common/icons/outlined/Upload.svg";
// store
import { writeFormStore } from "@/store/writeFormStore";

const UploadVideo = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { setVideo } = writeFormStore();

  return (
    <Box css={styles.container}>
      <Box
        css={styles.upload}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <Upload />
        <Typography css={styles.text}>동영상 업로드</Typography>
      </Box>
      <Typography css={styles.caption}>
        보유하신 영상을 넣어주시면 자동으로 이미지를 글에 첨부해 드릴게요!
      </Typography>
      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        style={{ display: "none" }}
      />
    </Box>
  );
};
export default UploadVideo;

const styles: CssObject = {
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
  upload: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "80px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    "& svg": {
      width: "44px",
    },
  }),
  text: css({ paddingTop: "5px", fontSize: "12px", fontWeight: 600 }),
  caption: css({
    textAlign: "center",
    fontWeight: 600,
    fontSize: "12px",
    marginTop: "10px",
    lineHeight: "18px /* 150% */",
    letterSpacing: "-0.12px",
  }),
};
