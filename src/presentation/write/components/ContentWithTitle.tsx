import { ReactNode } from "react";
// styles
import { Box, Typography, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";

interface ContentWithTitleProps {
  title: string;
  children: ReactNode;
}

const ContentWithTitle = ({ title, children }: ContentWithTitleProps) => {
  return (
    <Box css={styles.container}>
      <Typography css={styles.title}>{title}</Typography>
      {children}
    </Box>
  );
};

export default ContentWithTitle;

const styles: CssObject = {
  container: css({ marginBottom: "20px" }),
  title: css({ color: "#000 ", fontWeight: 600, paddingBottom: "10px" }),
};
