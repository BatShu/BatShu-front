import {
  useEffect,
  forwardRef,
  ForwardedRef,
  Dispatch,
  SetStateAction,
} from "react";
import flatpickr from "flatpickr";
import dayjs from "dayjs";
import { Korean } from "flatpickr/dist/l10n/ko.js";
// styles
import { CssObject } from "@/presentation/common/styles/types";
import { SerializedStyles, css } from "@emotion/react";

interface DatePickerProps {
  setDate: Dispatch<SetStateAction<string>>;
  noCalendar?: boolean;
  enableTime?: boolean;
  format?: string;
  css?: SerializedStyles;
}
const DatePicker = (
  {
    setDate,
    noCalendar = false,
    enableTime = false,
    format = "YYYY-MM-DD",
    css,
  }: DatePickerProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  useEffect(() => {
    if (ref === null || typeof ref === "function") return;

    flatpickr(ref.current as Node, {
      onValueUpdate: (_, date) => setDate(dayjs(date).format(format)),
      noCalendar,
      enableTime,
      disableMobile: true,
      locale: Korean,
      maxDate: "today",
    });
  }, [ref, noCalendar, enableTime, setDate, format]);

  return <input ref={ref} css={[styles.input, css]} />;
};

export default forwardRef(DatePicker);

const styles: CssObject = {
  input: css({
    visibility: "hidden",
    position: "absolute",
    top: 0,
    transform: "translateX(5%)",
  }),
};
