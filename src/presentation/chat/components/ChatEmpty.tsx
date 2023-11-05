import { Box, Typography, css } from "@mui/material";
import { ReactComponent as Eye } from "@/presentation/common/icons/splash/Eye.svg";
import Spacer from "@/presentation/common/atoms/Spacer";

export const ChatEmpty = () => {
  return (
    <Box css={styles.container}>
      <Spacer y={200} />
      <Eye />
      <Typography>대화 중인 채팅방이 없어요!</Typography>
    </Box>
  );
};

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& path, ellipse": { fill: "#787878" },
    "& line": { stroke: "#787878" },
    "& rect": { fill: "none" },
    "& p": { color: "#787878", fontSize: "0.875rem", fontWeight: 500 },
  }),
};
