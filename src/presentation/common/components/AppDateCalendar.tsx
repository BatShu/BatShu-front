import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  DateCalendar,
  DateCalendarProps,
} from "@mui/x-date-pickers/DateCalendar";
import { css } from "@emotion/react";

interface AppDateCalendarProps extends DateCalendarProps<Dayjs> {
  absolute?: boolean;
  hideOnClickOutside?: boolean;
  validRef?: RefObject<HTMLElement>;
  setShowCalendar?: Dispatch<SetStateAction<boolean>>;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

const AppDateCalendar = ({
  absolute,
  hideOnClickOutside,
  validRef,
  setShowCalendar,
  minDate = dayjs().subtract(15, "year"),
  maxDate = dayjs(),
  ...rest
}: AppDateCalendarProps) => {
  useEffect(() => {
    if (!hideOnClickOutside || !validRef) return;

    const clickOutSide = (e: MouseEvent) => {
      if (!validRef?.current?.contains(e.target as Element)) {
        setShowCalendar?.(false);
      }
    };

    window.addEventListener("click", clickOutSide);

    return () => window.removeEventListener("click", clickOutSide);
  }, [hideOnClickOutside, validRef, setShowCalendar]);

  return (
    <DateCalendar
      {...rest}
      css={appDateCalendarStyle(absolute)}
      disableFuture
      disableHighlightToday
      views={["year", "month", "day"]}
      minDate={minDate}
      maxDate={maxDate}
    />
  );
};

export default AppDateCalendar;

const appDateCalendarStyle = (absolute?: boolean) =>
  css({
    backgroundColor: "#fff",
    border: "1px solid #C1C1C1",
    borderRadius: "8px",
    ...(absolute && {
      position: "absolute",
      "& .MuiMonthCalendar-root": {
        position: "relative",
        width: "100%",
        height: "100%",
        top: 0,
      },
    }),
  });
