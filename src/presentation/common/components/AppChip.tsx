import { Chip, ChipProps, css } from "@mui/material";

type AppChipProps = ChipProps;

const AppChip = (props: AppChipProps) => {
  return <Chip {...props} css={AppChipStyle} />;
};
export default AppChip;

const AppChipStyle = css({
  color: "#808080",
  fontSize: "12px",
  backgroundColor: "#F5F5F5",
  borderRadius: "12px",
  fontWeight: 600,
});
