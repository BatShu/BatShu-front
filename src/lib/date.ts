import { Dayjs } from "dayjs";

export const updateOnlyDate = (prevDate: Dayjs, newDate: Dayjs) => {
  const year = newDate.get("year");
  const month = newDate.get("month");
  const date = newDate.get("date");

  return prevDate
    .set("year", year)
    .set("month", month)
    .set("date", date)
    .format();
};

export const setExactTimeOnDate = (date: Dayjs, time: number) =>
  date.set("hour", time).set("minutes", 0).set("seconds", 0).format();
