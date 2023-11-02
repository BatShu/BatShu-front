import dayjs from "dayjs";
// styles
import { Box, css } from "@mui/material";
// icons
import { ReactComponent as Frame39 } from "@/presentation/common/icons/outlined/Frame 39.svg";
import { ReactComponent as TimeCircle2 } from "@/presentation/common/icons/outlined/Time Circle 2.svg";
import { ReactComponent as Dollar } from "@/presentation/common/icons/outlined/Dollar Circle.svg";
// types
import type { Accident } from "@/domain/models/accident";
import type { Observe } from "@/domain/models/observe";
// constants
import { DATE_FORMAT_DETAIL_CHIP } from "@/presentation/configs";
// components
import DetailChip from "./DetailChip";

interface DetailChipsProps {
  accident?: Accident;
  observe?: Observe;
}

const DetailChips = ({ accident, observe }: DetailChipsProps) => {
  return (
    <Box css={styles.chipArea}>
      {accident && (
        <>
          <DetailChip Adornment={Frame39} text={accident.carModelName} />
          <DetailChip Adornment={Frame39} text={accident.licensePlate} />
          <DetailChip
            Adornment={Dollar}
            text={`${accident.bounty.toLocaleString()}원`}
          />
          <DetailChip
            Adornment={TimeCircle2}
            text={dayjs(accident.accidentTime[1].split(":")[0]).format(
              DATE_FORMAT_DETAIL_CHIP
            )}
          />
        </>
      )}
      {observe && (
        <>
          <DetailChip Adornment={Frame39} text={observe.carModelName} />
          <DetailChip Adornment={Frame39} text={observe.licensePlate} />
          <DetailChip
            Adornment={TimeCircle2}
            text={dayjs(observe.observeStartTime.split(":")[0]).format(
              DATE_FORMAT_DETAIL_CHIP
            )}
          />
        </>
      )}
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
