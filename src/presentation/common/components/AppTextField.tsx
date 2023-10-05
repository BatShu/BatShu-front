import { css } from "@emotion/react";
import { TextField, TextFieldProps } from "@mui/material";
import { ReactElement, forwardRef } from "react";

type AppTextFieldProps = TextFieldProps;
/**
 * 
 * @example
 * <AppTextField
        placeholder={"무엇을 봣슈~?"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                css={css`
                  color: var(--icon-color);
                `}
              />
            </InputAdornment>
          ),
        }}
      /> 
 */
export const AppTextField = forwardRef<HTMLInputElement, AppTextFieldProps>(
  (props: AppTextFieldProps, ref): ReactElement => {
    return (
      <TextField
        css={textFieldStyles}
        {...props}
        ref={ref}
        autoComplete="off"
      />
    );
  }
);

const textFieldStyles = css({
  display: "flex",
  justifyContent: "center",
  backgroundColor: "white",
  borderRadius: 8,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& input": {
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "normal",
    letterSpacing: "-0.41px",
    "&::placeholder": {
      color: "black",
    },
  },
});
