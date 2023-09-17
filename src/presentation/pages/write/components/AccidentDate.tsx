import { useRef, useState } from "react";
import dayjs from "dayjs";
// styles
import { Box, css, Typography } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import CustomTimePicker from "@/presentation/common/atoms/CustomTimePicker";
import { DATE_FORMAT } from "@/presentation/configs";
// store
import { writeFormStore } from "@/store/writeFormStore";
// components
import Spacer from "@/presentation/common/atoms/Spacer";
import AppChip from "@/presentation/common/components/AppChip";
import DatePicker from "@/presentation/common/atoms/DatePicker";

const AccidentDate = () => {
  const [date, setDate] = useState(dayjs().format(DATE_FORMAT));

  const datePickerRef = useRef<HTMLInputElement>(null);
  const { content, setFrom, setTo } = writeFormStore();

  return (
    <Box css={styles.container}>
      <Box css={styles.date} onClick={() => datePickerRef.current?.click()}>
        <AppChip label={date} css={css({ marginLeft: 5 })} />
        <DatePicker
          setDate={setDate}
          format={DATE_FORMAT}
          ref={datePickerRef}
        />
      </Box>

      <Spacer y={30} />

      <Box css={styles.timeWrapper}>
        <Box css={styles.time}>
          <AppChip label="시작" css={styles.chip} />
          <CustomTimePicker setValue={setFrom} />
        </Box>
        <Typography css={styles.text}>부터</Typography>
        <Box css={styles.time}>
          <AppChip label="종료" css={styles.chip} />
          <CustomTimePicker setValue={setTo} />
        </Box>
      </Box>
    </Box>
  );
};

export default AccidentDate;

const styles: CssObject = {
  container: css({
    display: "flex",
    position: "relative",
    flexDirection: "column",
  }),
  timeWrapper: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    "& *": { fontFamily: "Pretendard" },
  }),
  chip: css({
    width: "50px",
    height: "25px",
    fontSize: "12px",
    fontWeight: 600,
  }),
  time: css({ display: "flex", flexDirection: "column", width: "40%" }),
  text: css({ color: "#808080", margin: "25px 10px 0 0" }),
  date: css({
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    cursor: "pointer",
  }),
};
