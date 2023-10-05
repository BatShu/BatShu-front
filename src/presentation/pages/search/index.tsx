import { useState, useRef, ReactElement } from "react";
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
import { ReactComponent as Up2 } from "@/presentation/common/icons/outlined/Up 2.svg";
// components
import { AppTextField } from "../../common/components/AppTextField";
import AppButton from "../../common/components/AppButton";
import Spacer from "../../common/atoms/Spacer";
import PlaceResult from "./components/PlaceResult";
import InputChip from "../../common/atoms/InputChip";
import AppDateCalendar from "@/presentation/common/components/AppDateCalendar";
import { Controller, useForm } from "react-hook-form";

interface SearchForm {
  keyword: string;
  place: kakao.maps.services.PlacesSearchResultItem | null;
  date: Dayjs | null;
  carNumber: {
    head: string;
    middle: string;
    rear: string;
  };
}
const useSearchForm = () => {
  return useForm<SearchForm>();
};

export const SearchPage = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    control,
    watch,
    setValue,
  } = useSearchForm();
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);
  const date = watch("date");
  const keyword = watch("keyword");
  const place = watch("place");
  const { data: placeResult } = useKakaoMapSearch(keyword);
  const navigate = useNavigate();

  const onSubmit = (data: SearchForm) => {
    console.log(data);
  };

  return (
    <form css={pageContentStyles} onSubmit={handleSubmit(onSubmit)}>
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
              {...register("keyword")}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && place) {
                  setValue("place", null);
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
            {placeResult && (
              <PlaceResult
                data={placeResult}
                setPlace={(place) => {
                  setValue("place", place);
                  setValue("keyword", "");
                }}
                top={60}
              />
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
                    <Up2 />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
              css={[styles.inputSelect(!!date), styles.cursor]}
              onClick={() => setShowCalendar(true)}
            />
            {showCalendar && (
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <AppDateCalendar
                    css={styles.calendar}
                    hideOnClickOutside
                    absolute
                    validRef={calendarRef}
                    setShowCalendar={setShowCalendar}
                    value={field.value}
                    onChange={(newDate) => {
                      field.onChange(newDate);
                      setShowCalendar(false);
                    }}
                  />
                )}
              />
            )}
          </Box>

          <Spacer y={12} />

          <Grid container>
            <Grid item xs={3.2}>
              <AppTextField
                placeholder="00"
                {...register("carNumber.head", {
                  required: true,
                  minLength: 2,
                  maxLength: 3,
                  pattern: /^[0-9]*$/,
                })}
                inputProps={{
                  maxLength: 3,
                  inputMode: "numeric",
                }}
                css={styles.inputNumber}
              />
            </Grid>

            <Grid item xs={0.3} />
            <Grid item xs={1.8}>
              <AppTextField
                {...register("carNumber.middle", {
                  required: true,
                  minLength: 1,
                  maxLength: 1,
                  pattern: /^[가-힣]$/,
                })}
                placeholder="가"
                inputProps={{
                  maxLength: 1,
                  inputMode: "text",
                }}
                css={[styles.inputNumber, styles.text]}
              />
            </Grid>
            <Grid item xs={0.3} />

            <Grid item xs={6.4}>
              <AppTextField
                {...register("carNumber.rear", {
                  required: true,
                  minLength: 4,
                  maxLength: 4,
                  pattern: /^[0-9]*$/,
                })}
                placeholder="0000"
                inputProps={{
                  maxLength: 4,
                  inputMode: "numeric",
                }}
                css={styles.inputNumber}
              />
            </Grid>
          </Grid>
        </Box>
        <AppButton
          css={styles.button(isValid)}
          disabled={!isValid}
          type="submit"
        >
          검색하기
        </AppButton>
      </Box>
    </form>
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
  button: (isValid: boolean) =>
    css({
      position: "absolute",
      bottom: 36,
      left: 0,
      width: "100%",
      height: "44px",
      color: "#fff",
      backgroundColor: isValid ? "#000" : "#ccc",
      fontWeight: 600,
    }),
} satisfies CssObject;
