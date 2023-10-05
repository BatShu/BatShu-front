import { ReactElement } from "react";
import { Button, ButtonProps, css } from "@mui/material";

type AppButtonProps = ButtonProps;

const AppButton = (props: AppButtonProps): ReactElement => {
  return (
    <Button
      {...props}
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
    />
  );
};
export default AppButton;
