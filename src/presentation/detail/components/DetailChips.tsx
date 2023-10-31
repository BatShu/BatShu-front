import dayjs from "dayjs";
// styles
import { Box, css } from "@mui/material";
// icons
import { ReactComponent as Frame39 } from "@/presentation/common/icons/outlined/Frame 39.svg";
import { ReactComponent as TimeCircle2 } from "@/presentation/common/icons/outlined/Time Circle 2.svg";
import { ReactComponent as Dollar } from "@/presentation/common/icons/outlined/Dollar Circle.svg";
// constants
import { DATE_FORMAT_DETAIL_CHIP } from "@/presentation/configs";
// components
import DetailChip from "./DetailChip";
import { Accident } from "@/domain/models/accident";
import { Observe } from "@/domain/models/observe";

interface AccidentDetailChipsProps {
  accident: Accident;
}

export const AccidentDetailChips = ({ accident }: AccidentDetailChipsProps) => {
  const { carModelName, licensePlate, bounty, accidentTime } = accident;

  return (
    <Box css={styles.chipArea}>
      <DetailChip Adornment={Frame39} text={carModelName} />
      <DetailChip Adornment={Frame39} text={licensePlate} />
      <DetailChip Adornment={Dollar} text={`${bounty.toLocaleString()}원`} />
      <DetailChip
        Adornment={TimeCircle2}
        text={dayjs(accidentTime[1]).format(DATE_FORMAT_DETAIL_CHIP)}
      />
    </Box>
  );
};

interface ObserveDetailChipsProps {
  observe: Observe;
}

export const ObserveDetailChips = ({ observe }: ObserveDetailChipsProps) => {
  const { carModelName, licensePlate, observeEndTime } = observe;

  return (
    <Box css={styles.chipArea}>
      <DetailChip Adornment={Frame39} text={carModelName} />
      <DetailChip Adornment={Frame39} text={licensePlate} />
      <DetailChip
        Adornment={TimeCircle2}
        text={dayjs(observeEndTime).format(DATE_FORMAT_DETAIL_CHIP)}
      />
    </Box>
  );
};

const styles = {
  chipArea: css({
    display: "flex",
    flexWrap: "wrap",
  }),
};
