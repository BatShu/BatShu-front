import {
  useEffect,
  forwardRef,
  ForwardedRef,
  Dispatch,
  SetStateAction,
} from "react";
import flatpickr from "flatpickr";
import { Korean } from "flatpickr/dist/l10n/ko.js";
// styles
import { CssObject } from "@/presentation/common/styles/types";
import { css } from "@emotion/react";

interface DatePickerProps {
  setDate: Dispatch<SetStateAction<string>>;
  noCalendar?: boolean;
  enableTime?: boolean;
}
const DatePicker = (
  { setDate, noCalendar = false, enableTime = false }: DatePickerProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  useEffect(() => {
    if (ref === null || typeof ref === "function") return;

    flatpickr(ref.current as Node, {
      onValueUpdate: (_, date) => setDate(date),
      noCalendar,
      enableTime,
      disableMobile: true,
      locale: Korean,
    });
  }, [ref, noCalendar, enableTime, setDate]);

  return <input ref={ref} css={styles.input} />;
};

export default forwardRef(DatePicker);

const styles: CssObject = {
  input: css({
    visibility: "hidden",
    position: "absolute",
    top: -10,
    transform: "translateX(25%)",
  }),
};
