import { IconButton, IconButtonProps, css } from "@mui/material";

type AppIconButtonProps = IconButtonProps;

/**
 * size = small -> 44px
 * size = medium -> 52px
 */
export const AppIconButton = (props: AppIconButtonProps) => {
  return <IconButton css={buttonStyles} {...props} />;
};

const buttonStyles = css({
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "& svg": {
    color: "#525252",
    width: 24,
    height: 24,
  },
  "&.MuiIconButton-sizeSmall": {
    padding: 10,
  },
  "&.MuiIconButton-sizeMedium": {
    padding: 14,
  },
});
