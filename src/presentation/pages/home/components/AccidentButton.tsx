import { css } from "@emotion/react";
import { IconButton, IconButtonProps } from "@mui/material";
import { ReactElement } from "react";
import { ReactComponent as DocumentIcon } from "@/presentation/common/icons/outlined/Document Justify Center 1.svg";

const buttonStyles = css({
  display: "flex",
  width: 44,
  height: 44,
  padding: 10,
  justifyContent: "center",
  alignItems: "center",
  flexShrink: 0,
  borderRadius: 8,
  background: "#fff",
  boxShadow: "4px 4px 6px 0px rgba(75, 75, 75, 0.03)",
  "& .MuiTouchRipple-root span": {
    borderRadius: 8,
  },
  "&:hover": {
    background: "#f5f5f5",
  },
});

const iconStyles = css({
  color: "#444444",
});

export const AccidentButton = (props: IconButtonProps): ReactElement => {
  return (
    <IconButton css={buttonStyles} {...props}>
      <DocumentIcon css={iconStyles} />
    </IconButton>
  );
};
