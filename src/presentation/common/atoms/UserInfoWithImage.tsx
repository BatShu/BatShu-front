// styles
import { Box, Typography, css } from "@mui/material";
// components
import SkeletonImage from "./SkeletonImage";
import { dummyDetail } from "@/presentation/home/temp";

interface UserInfoWithImageProps {
  author: (typeof dummyDetail)["author"];
}

const UserInfoWithImage = ({ author }: UserInfoWithImageProps) => {
  return (
    <Box css={styles.container}>
      <SkeletonImage
        variant="rounded"
        src={author.photoURL}
        imgCss={styles.profileImage}
      />
      <Typography css={styles.text}>{author.displayName}</Typography>
    </Box>
  );
};

export default UserInfoWithImage;

const styles = {
  container: css({
    display: "flex",
    alignItems: "center",
  }),
  profileImage: css({
    width: 42,
    height: 42,
    marginRight: 15,
    aspectRatio: "1",
    borderRadius: 999,
  }),
  text: css({
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "34px /* 170% */",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "120px",
    textOverflow: "ellipsis",
  }),
};
