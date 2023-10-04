import { Box, Typography, css } from "@mui/material";
import { CssObject } from "@/presentation/common/styles/types";
// components
import Spacer from "@/presentation/common/atoms/Spacer";

interface DotsHeaderProps {
  curPage: number;
}

const DotsHeader = ({ curPage }: DotsHeaderProps) => {
  const getTitle = () => {
    switch (curPage) {
      case 0:
        return "사고자/목격자 선택";
      case 1:
        return "내용기입";
    }
  };

  return (
    <Box css={styles.container}>
      <Box css={styles.dotWrapper}>
        {[...new Array(2)].map((_, idx) => (
          <Box
            key={idx}
            bgcolor={curPage === idx ? "#000" : "#CCC"}
            css={styles.dot}
          />
        ))}
      </Box>

      <Spacer y={10} />

      <Typography css={styles.text}>{getTitle()}</Typography>
    </Box>
  );
};

export default DotsHeader;

const styles: CssObject = {
  container: css({
    display: "flex",
    position: "absolute",
    top: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  }),
  dotWrapper: css({ display: "flex", width: "100%", justifyContent: "center" }),
  dot: css({
    width: "15px",
    height: "3px",
    marginRight: "5px",
  }),
  text: css({ fontSize: "12px", fontWeight: 600 }),
};
