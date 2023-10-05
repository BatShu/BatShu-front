import { ReactElement } from "react";
import { css } from "@mui/material";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
type AppButtonProps = LoadingButtonProps;

const AppButton = (props: AppButtonProps): ReactElement => {
  return (
    <LoadingButton
      css={css`
        border-radius: 8px;
        font-size: 18px;
        font-weight: 600;
        background-color: #000;
        color: #fff;
        &:hover {
          background-color: #333;
        }

        &:disabled {
          background-color: #bbb;
        }
      `}
      {...props}
    />
  );
};
export default AppButton;
