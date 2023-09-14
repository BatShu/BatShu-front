import { useState, useEffect, useRef, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
// styles
import { Box, InputAdornment, Typography, css } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { pageContentStyles } from "../common/styles/pageStyles";
import { CssObject } from "../common/styles/types";
// hooks
import useKakaoMapSearch from "@/hook/useKakaoMapSearch";
// icons
import { ReactComponent as Left1 } from "@/presentation/common/icons/outlined/Left 1.svg";
import { ReactComponent as Group174 } from "@/presentation/common/icons/asset/Group 174.svg";
import { ReactComponent as Location } from "@/presentation/common/icons/outlined/Location.svg";
import { ReactComponent as Calender1 } from "@/presentation/common/icons/outlined/Calender 1.svg";
import { ReactComponent as Down2 } from "@/presentation/common/icons/outlined/Down 2.svg";
// components
import { AppTextField } from "../common/components/AppTextField";
import AppButton from "../common/components/AppButton";
import Spacer from "../common/atoms/Spacer";
import PlaceResult from "./components/PlaceResult";
import InputChip from "../common/components/InputChip";
import DatePicker from "../common/components/DatePicker";

export const SearchPage = (): ReactElement => {
  const [keyword, setKeyword] = useState("");
  const [place, setPlace] =
    useState<kakao.maps.services.PlacesSearchResultItem | null>(null);
  const [date, setDate] = useState("");
  const [carNumber, setCarNumber] = useState({
    head: "",
    middle: "",
    rear: "",
  });
  const [inputComplete, setInputComplete] = useState(false);

  const datePickerRef = useRef<HTMLInputElement>(null);

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

  const validFill = (valid: boolean) =>
    css({
      "& path": { fill: valid ? "#000" : "#CCCCCC" },
    });

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
              css={[styles.inputSelect, validFill(!!place)]}
            />
            {keyword && <PlaceResult data={result} setPlace={setPlace} />}
          </Box>

          <Spacer y={12} />

          <Box position="relative">
            <AppTextField
              placeholder={!date ? "언제 인가요?" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calender1 />
                    {date && <InputChip text={date} />}
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Down2 />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              css={[styles.inputSelect, styles.cursor, validFill(!!date)]}
              onClick={() => datePickerRef.current?.click()}
            />
            <DatePicker setDate={setDate} ref={datePickerRef} />
          </Box>

          <Spacer y={12} />

          <Grid2 container>
            <Grid2 xs={3.2}>
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
            </Grid2>

            <Grid2 xs={0.3} />
            <Grid2 xs={1.8}>
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
            </Grid2>
            <Grid2 xs={0.3} />

            <Grid2 xs={6.4}>
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
            </Grid2>
          </Grid2>
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

const styles: CssObject = {
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
  inputSelect: css({
    boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
    cursor: "pointer",
    "& input::placeholder": {
      color: "#CCCCCC",
    },
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
    bottom: 20,
    left: 0,
    width: "100%",
    height: "44px",
    color: "#fff",
    fontWeight: 600,
  }),
};
