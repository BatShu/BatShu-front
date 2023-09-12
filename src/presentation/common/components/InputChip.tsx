import { Box } from "@mui/material";
import { css } from "@emotion/react";

interface InputChipProps {
  text: string;
}

const InputChip = ({ text }: InputChipProps) => {
  return <Box css={styles.container}> {text}</Box>;
};

export default InputChip;

const styles = {
  container: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: "8px",
    marginLeft: "12px",
    backgroundColor: "#F7F7F7",
    color: "#000",
    fontFamily: "Pretendard",
  }),
};
