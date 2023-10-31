// styles
import { Box, Typography, css } from "@mui/material";

interface DetailContentProps {
  data: {
    contentTitle: string;
    createdAt: string;
    contentDescription: string;
  };
}

const DetailContent = ({ data }: DetailContentProps) => {
  const { contentTitle, createdAt, contentDescription } = data;

  return (
    <Box css={styles.content}>
      <Typography className="title">{contentTitle}</Typography>
      <Typography className="date">{createdAt.split("T")[0]}</Typography>
      <Typography className="description">{contentDescription}</Typography>
    </Box>
  );
};

export default DetailContent;

const styles = {
  content: css({
    "& .title": {
      color: "#5C5C5C",
      fontSize: "22px",
      fontWeight: 600,
      lineHeight: "34px /* 154.545% */",
      letterSpacing: "-0.66px",
      marginTop: "16px",
    },
    "& .date": {
      color: "#D2D2D2",
      fontSize: "12px",
      fontWeight: 500,
      letterSpacing: "-0.24px",
    },
    "& .description": {
      padding: "8px 0 24px 0",
      color: "#A1A1A1",
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "24px /* 150% */",
      letterSpacing: "-0.32px",
    },
  }),
};
