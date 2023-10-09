import { useState } from "react";
// styles
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  css,
  InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CssObject } from "@/presentation/common/styles/types";
// icons
import { ReactComponent as Won } from "@/presentation/common/icons/filled/Won.svg";

// store
import { useWriteFormContext } from "@/presentation/write/hooks/writeForm";
// components
import { AppTextField } from "@/presentation/common/components/AppTextField";
import AppButton from "@/presentation/common/components/AppButton";
import ContentWithTitle from "./ContentWithTitle";
import AccidentDate from "./AccidentDate";
import UploadImage from "./UploadImage";
import Spacer from "@/presentation/common/atoms/Spacer";
import { Controller } from "react-hook-form";
import { SearchMapPreview } from "./SearchMapPreview";

const Detail = () => {
  const [skipCarNumber, setSkipCarNumber] = useState(false);
  const {
    watch,
    register,
    setValue,
    control,
    formState: { isValid },
  } = useWriteFormContext();
  const {
    type,
    content: { location },
  } = watch();
  const isWitness = type === "목격자";
  return (
    <Box css={styles.container}>
      {!isWitness && <UploadImage />}

      <Spacer y={30} />

      <AppTextField
        placeholder="제목을 입력해 주세요!"
        {...register("title")}
      />

      <Spacer y={30} />

      <ContentWithTitle title="사고시간">
        <Accordion css={styles.accordion} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography css={css(`color:#8a8a8a;font-weight:500;`)}>
              시간을 선택해주세요!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AccidentDate />
          </AccordionDetails>
        </Accordion>
      </ContentWithTitle>

      <ContentWithTitle title="차량번호">
        <AppTextField
          placeholder="차량번호를 입력해주세요!"
          css={styles.halfWidth()}
          {...register("licensePlate")}
        />
      </ContentWithTitle>

      <ContentWithTitle title="차량종류">
        <Box display="flex" alignItems="center">
          <AppTextField
            placeholder="차량종류를 입력해주세요!"
            css={styles.halfWidth(skipCarNumber)}
            disabled={skipCarNumber}
            {...register("content.carModelName")}
          />
          <AppButton
            onClick={() => {
              setSkipCarNumber((prev) => !prev);
              setValue("content.carModelName", "");
            }}
            css={styles.skipButton}
            disabled={skipCarNumber}
          >
            차종모름
          </AppButton>
        </Box>
      </ContentWithTitle>

      <ContentWithTitle title="사고위치">
        <SearchMapPreview
          location={location}
          onLocationChange={(value) => {
            setValue("content.location", value);
          }}
        />
      </ContentWithTitle>

      {!isWitness && (
        <ContentWithTitle title="포상금">
          <Controller
            control={control}
            name="content.bounty"
            render={({ field: { onChange, value } }) => (
              <AppTextField
                placeholder="포상금을 입력해주세요!"
                css={styles.halfWidth()}
                value={value == 0 ? "" : value.toLocaleString()}
                inputMode="numeric"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Won css={css({ "& path": { fill: "#000" } })} />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  const bounty = e.target.value.replaceAll(",", "");
                  if (!/^[0-9]*$/.test(bounty)) return;
                  onChange(Number(bounty));
                }}
              />
            )}
          />
        </ContentWithTitle>
      )}

      <ContentWithTitle title="사고내용">
        <AppTextField
          className="no-fix"
          placeholder={`${
            isWitness ? "사고" : "목격"
          }자가 알아볼 수 있도록, 사고 내용을 자세하게 입력해주세요`}
          css={styles.memo}
          multiline
          {...register("content.description", { required: true })}
        />
      </ContentWithTitle>

      <AppButton css={styles.button(isValid)} disabled={!isValid} type="submit">
        등록하기
      </AppButton>
    </Box>
  );
};

export default Detail;

const styles = {
  container: css({
    overflow: "scroll",
    "& .MuiTextField-root:not(.no-fix)": { height: "40px" },
    "& .MuiAccordion-root": {
      borderRadius: "8px !important",
      boxShadow: "none",
      "::before": { display: "none" },
    },
    "& .MuiAccordionSummary-root": { minHeight: "40px" },
    "& .MuiAccordionSummary-content": { margin: "4px 0" },
    "& .MuiAccordionDetails-root": { padding: "8px 16px" },
  }),
  accordion: css({
    borderRadius: "8px",
  }),
  halfWidth: (skipCarNumber?: boolean) =>
    css({ width: "65%", backgroundColor: skipCarNumber ? "#DBDBDB" : "#fff" }),
  skipButton: css({
    border: "0.5px solid #bbb",
    borderRadius: "18px",
    fontSize: "12px",
    marginLeft: "20px",
    height: "32px",
  }),
  map: css({
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    marginTop: "10px",
    "& img": { pointerEvents: "none" },
  }),
  memo: css({
    justifyContent: "flex-start",
    minHeight: "100px",
    "& textarea": { fontSize: "13px" },
  }),
  button: (isValid: boolean) =>
    css({
      position: "sticky",
      marginTop: "60px",
      fontSize: "20px",
      bottom: 28,
      width: "100%",
      color: "#fff",
      zIndex: 999,
      backgroundColor: isValid ? "#000" : "#bbb",
    }),
} satisfies CssObject;
