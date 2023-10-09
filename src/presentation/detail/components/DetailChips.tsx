// styles
import { Box, css } from "@mui/material";
// icons
import { ReactComponent as Frame39 } from "@/presentation/common/icons/outlined/Frame 39.svg";
import { ReactComponent as TimeCircle2 } from "@/presentation/common/icons/outlined/Time Circle 2.svg";
import { ReactComponent as Dollar } from "@/presentation/common/icons/outlined/Dollar Circle.svg";
// types
import type { dummyDetail } from "../../home/temp";
// components
import DetailChip from "./DetailChip";

interface DetailChipsProps {
  data: typeof dummyDetail;
}

const DetailChips = ({ data }: DetailChipsProps) => {
  const { accidentTime } = data;
  return (
    <Box css={styles.chipArea}>
      <DetailChip Adornment={Frame39} text="2022 SONATA" />
      <DetailChip Adornment={Frame39} text="65호 4052" />
      <DetailChip Adornment={Dollar} text="30000원" />
      <DetailChip Adornment={TimeCircle2} text={accidentTime} />
    </Box>
  );
};

export default DetailChips;

const styles = {
  chipArea: css({
    display: "flex",
    flexWrap: "wrap",
    "& .chip": {
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
    },
    "& svg": { marginRight: "5px" },
  }),
};
