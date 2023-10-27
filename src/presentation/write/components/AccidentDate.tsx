import { useState, useEffect, useRef, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
// styles
import { Box, css, Typography } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
import CustomTimePicker from "@/presentation/common/atoms/CustomTimePicker";
import { DATE_FORMAT_WRITE } from "@/presentation/configs";
// store
import { useWriteFormContext } from "@/presentation/write/hooks/writeForm";
// components
import Spacer from "@/presentation/common/atoms/Spacer";
import AppChip from "@/presentation/common/components/AppChip";
import AppDateCalendar from "@/presentation/common/components/AppDateCalendar";

const AccidentDate = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);
  const { watch, setValue } = useWriteFormContext();
  const type = watch("type");
  const accidentTime = watch("accidentTime");
  const calendarRef = useRef<HTMLDivElement>(null);

  const updateOnlyDate = useCallback(
    (newDate: Dayjs | null) => {
      if (!newDate) return;
      const newAccidentTime = accidentTime.map((oldDay) => {
        return dayjs(oldDay).set("date", newDate.date()).format();
      }) as [string, string];

      setValue("accidentTime", newAccidentTime);
      setDate(dayjs(newAccidentTime[0]));
    },
    [accidentTime, setValue]
  );

  const setAccidentValue = useCallback(
    (isFrom: boolean, hour: number) => {
      const idxValue = isFrom ? 0 : 1;
      setValue(
        `accidentTime.${idxValue}`,
        dayjs(accidentTime[idxValue]).hour(hour).minute(0).format()
      );
    },
    [accidentTime, setValue]
  );

  const setFromHour = useCallback(
    (from: number) => setAccidentValue(true, from),
    [setAccidentValue]
  );

  const setToHour = useCallback(
    (to: number) => setAccidentValue(false, to),
    [setAccidentValue]
  );

  useEffect(() => {
    setDate(dayjs());
  }, [type]);

  return (
    <Box css={styles.container}>
      <Box css={styles.date} ref={calendarRef}>
        <AppChip
          label={date?.format(DATE_FORMAT_WRITE)}
          css={css({ marginLeft: 5 })}
          onClick={() => setShowCalendar(true)}
        />
        {showCalendar && (
          <AppDateCalendar
            value={date}
            absolute
            onChange={(newDate: Dayjs | null) => {
              updateOnlyDate(newDate);
              setShowCalendar(false);
            }}
            onMonthChange={() => setShowCalendar(true)}
            onYearChange={() => setShowCalendar(true)}
            hideOnClickOutside
            css={styles.calendar}
            validRef={calendarRef}
            setShowCalendar={setShowCalendar}
          />
        )}
      </Box>

      <Spacer y={30} />

      <Box css={styles.timeWrapper}>
        <Box css={styles.time}>
          <AppChip label="시작" css={styles.chip} />
          <CustomTimePicker onChange={setFromHour} resetKey={type} />
        </Box>
        <Typography css={styles.text}>부터</Typography>
        <Box css={styles.time}>
          <AppChip label="종료" css={styles.chip} />
          <CustomTimePicker onChange={setToHour} resetKey={type} />
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
  calendar: css({
    width: "100%",
    top: 35,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 5,
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
