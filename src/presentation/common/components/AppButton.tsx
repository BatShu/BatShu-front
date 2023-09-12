import { ReactElement } from "react";
import { Button, ButtonProps, css } from "@mui/material";

interface AppButtonProps extends ButtonProps {
  backgroundcolor?: string;
}

const AppButton = (props: AppButtonProps): ReactElement => {
  const backgroundColor = props.backgroundcolor || "var(--primary)";

  return (
    <Button
      {...props}
      css={css`
        border-radius: 8px;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        background-color: ${backgroundColor};
        :hover {
          background-color: ${backgroundColor};
        }
      `}
    />
  );
};
export default AppButton;
