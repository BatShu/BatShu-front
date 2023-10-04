import { useState, useEffect, useRef, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import type { Dayjs } from "dayjs";
// styles
import { Box, Grid, InputAdornment, Typography, css } from "@mui/material";
import { pageContentStyles } from "../../common/styles/pageStyles";
import { CssObject } from "../../common/styles/types";
// hooks
import useKakaoMapSearch from "@/hook/useKakaoMapSearch";
// constants
import { DATE_FORMAT_SEARCH } from "@/presentation/configs";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { ReactComponent as Group174 } from "@/presentation/common/icons/asset/Group 174.svg";
import { ReactComponent as Location } from "@/presentation/common/icons/outlined/Location.svg";
import { ReactComponent as Calender1 } from "@/presentation/common/icons/outlined/Calender 1.svg";
import { ReactComponent as Down2 } from "@/presentation/common/icons/outlined/Down 2.svg";
// components
import { AppTextField } from "../../common/components/AppTextField";
import AppButton from "../../common/components/AppButton";
import Spacer from "../../common/atoms/Spacer";
import PlaceResult from "./components/PlaceResult";
import InputChip from "../../common/atoms/InputChip";
import AppDateCalendar from "@/presentation/common/components/AppDateCalendar";

export const SearchPage = (): ReactElement => {
  const [keyword, setKeyword] = useState("");
  const [place, setPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [carNumber, setCarNumber] = useState({
    head: "",
    middle: "",
    rear: "",
  });
  const [inputComplete, setInputComplete] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const { result } = useKakaoMapSearch(keyword);
  const navigate = useNavigate();

  useEffect(() => {
    if (place) setKeyword("");
  }, [place]);

  useEffect(() => {
    const { head, middle, rear } = carNumber;
    setInputComplete(
      Boolean(
        place &&
          date &&
          head.length >= 2 &&
          middle.length === 1 &&
          rear.length === 4
      )
    );
  }, [place, date, carNumber]);

  return (
    <Box css={pageContentStyles}>
      <Box css={styles.container}>
        <Left1 onClick={() => navigate(-1)} css={css(`cursor:pointer;`)} />

        <Spacer y={23} />

        <Box css={styles.image}>
          <Group174 />
        </Box>

        <Spacer y={32} />

        <Typography variant="h5" fontWeight={600}>
          자세한 검색을 위해
          <br />
          조금 더 구체적으로 알려주세요!
        </Typography>

        <Spacer y={24} />

        <Box>
          <Box position="relative">
            <AppTextField
              value={keyword}
              onChange={({ target: { value } }) => {
                if (place) return;
                setKeyword(value);
              }}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing || !place) return;

                if (e.key === "Backspace") {
                  setPlace(null);
                }
              }}
              placeholder={!place ? "어디 인가요?" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Location />
                    {place && <InputChip text={place.place_name} />}
                  </InputAdornment>
                ),
              }}
              css={styles.inputSelect(!!place)}
            />
            {keyword && (
              <PlaceResult data={result} setPlace={setPlace} top={60} />
            )}
          </Box>

          <Spacer y={12} />

          <Box position="relative" ref={calendarRef}>
            <AppTextField
              placeholder={!date ? "언제 인가요?" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calender1 />
                    {date && (
                      <InputChip text={date.format(DATE_FORMAT_SEARCH)} />
                    )}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Down2 />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              css={[styles.inputSelect(!!date), styles.cursor]}
              onClick={() => setShowCalendar(true)}
            />
            {showCalendar && (
              <AppDateCalendar
                onChange={(date) => {
                  setDate(date as Dayjs);
                  setShowCalendar(false);
                }}
                onMonthChange={() => {
                  setShowCalendar(true);
                }}
                onYearChange={() => {
                  setShowCalendar(true);
                }}
                css={styles.calendar}
                hideOnClickOutside
                absolute
                validRef={calendarRef}
                setShowCalendar={setShowCalendar}
              />
            )}
          </Box>

          <Spacer y={12} />

          <Grid container>
            <Grid item xs={3.2}>
              <AppTextField
                value={carNumber.head}
                onChange={({ target: { value } }) => {
                  setCarNumber((prev) => ({ ...prev, head: value }));
                }}
                placeholder="00"
                inputProps={{
                  maxLength: 3,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                css={styles.inputNumber}
              />
            </Grid>

            <Grid item xs={0.3} />
            <Grid item xs={1.8}>
              <AppTextField
                value={carNumber.middle}
                onChange={({ target: { value } }) => {
                  setCarNumber((prev) => ({ ...prev, middle: value }));
                }}
                placeholder="가"
                inputProps={{
                  maxLength: 1,
                  inputMode: "text",
                  pattern: "/^[가-힣]$/",
                }}
                css={[styles.inputNumber, styles.text]}
              />
            </Grid>
            <Grid item xs={0.3} />

            <Grid item xs={6.4}>
              <AppTextField
                value={carNumber.rear}
                onChange={({ target: { value } }) => {
                  setCarNumber((prev) => ({ ...prev, rear: value }));
                }}
                placeholder="0000"
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                css={styles.inputNumber}
              />
            </Grid>
          </Grid>
        </Box>
        <AppButton
          css={styles.button}
          backgroundcolor={inputComplete ? "#000" : "#bbb"}
        >
          검색하기
        </AppButton>
      </Box>
    </Box>
  );
};

const styles = {
  container: css({
    position: "relative",
    width: "100%",
    height: "100%",
  }),
  image: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  inputSelect: (valid: boolean) =>
    css({
      boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
      cursor: "pointer",
      "& input::placeholder": {
        color: "#CCCCCC",
      },
      "& path": { fill: valid ? "#000" : "#CCCCCC" },
    }),
  calendar: css({
    width: "90%",
    zIndex: 5,
    bottom: 60,
    left: "50%",
    transform: "translateX(-50%)",
  }),
  cursor: css({ cursor: "pointer", "& *": { cursor: "pointer" } }),
  inputNumber: css({
    height: "48px",
    boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
    "& input": {
      padding: 0,
      textAlign: "center",
      fontSize: "32px",
      fontWeight: 600,
      "::placeholder": { color: "#DBDBDB" },
    },
  }),
  text: css({
    "& input": {
      fontSize: "28px",
    },
  }),
  button: css({
    position: "absolute",
    bottom: 36,
    left: 0,
    width: "100%",
    height: "44px",
    color: "#fff",
    fontWeight: 600,
  }),
} satisfies CssObject;
