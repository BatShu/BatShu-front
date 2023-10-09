import { FunctionComponent } from "react";
// styles
import { Box, css } from "@mui/material";
import { SerializedStyles } from "@emotion/react";

interface DetailChipProps {
  Adornment?: FunctionComponent;
  text: string;
  style?: SerializedStyles;
}

const DetailChip = ({ Adornment, text, style }: DetailChipProps) => {
  return (
    <Box css={[styles.chip, style]}>
      {Adornment && <Adornment />}
      {text}
    </Box>
  );
};

export default DetailChip;

const styles = {
  chip: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    margin: "10px 10px 0 0",
    whiteSpace: "nowrap",
    fontSize: "14px",
    fontWeight: 500,
    color: "#000",
    border: "1px solid #d5d5d5",
    borderRadius: "12px",
    padding: "6px 15px",
    cursor: "default",
    "& svg": { marginRight: "5px" },
  }),
};
