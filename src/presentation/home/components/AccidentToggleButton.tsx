import { css } from "@emotion/react";
import { IconButton, IconButtonProps } from "@mui/material";
import { ReactElement } from "react";
import { ReactComponent as LocationIcon } from "@/presentation/common/icons/outlined/Location Tick.svg";

const buttonStyles = css({
  width: 44,
  height: 44,
  flexShrink: 0,
  borderRadius: 44,
  background: "#121212",
  "&:hover": {
    background: "#1e1e1e",
  },
});

const iconStyles = css({
  display: "flex",
  width: 24,
  height: 24,
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  color: "#fff",
});

export const AccidentToggleButton = (props: IconButtonProps): ReactElement => {
  return (
    <IconButton css={buttonStyles} {...props}>
      <LocationIcon css={iconStyles} />
    </IconButton>
  );
};
