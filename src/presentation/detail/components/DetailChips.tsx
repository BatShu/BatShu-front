import dayjs from "dayjs";
// styles
import { Box, css } from "@mui/material";
// icons
import { ReactComponent as Frame39 } from "@/presentation/common/icons/outlined/Frame 39.svg";
import { ReactComponent as TimeCircle2 } from "@/presentation/common/icons/outlined/Time Circle 2.svg";
import { ReactComponent as Dollar } from "@/presentation/common/icons/outlined/Dollar Circle.svg";
// types
import type { dummyDetail } from "../../home/temp";
// constants
import { DATE_FORMAT_DETAIL_CHIP } from "@/presentation/configs";
// components
import DetailChip from "./DetailChip";

interface DetailChipsProps {
  data: typeof dummyDetail;
}

const DetailChips = ({ data }: DetailChipsProps) => {
  const { carModelName, licensePlate, bounty, accidentTime } = data;

  return (
    <Box css={styles.chipArea}>
      <DetailChip Adornment={Frame39} text={carModelName} />
      <DetailChip Adornment={Frame39} text={licensePlate} />
      <DetailChip Adornment={Dollar} text={`${bounty.toLocaleString()}원`} />
      <DetailChip
        Adornment={TimeCircle2}
        text={dayjs(accidentTime[1].split(":")[0]).format(
          DATE_FORMAT_DETAIL_CHIP
        )}
      />
    </Box>
  );
};

export default DetailChips;

const styles = {
  chipArea: css({
    display: "flex",
    flexWrap: "wrap",
  }),
};
