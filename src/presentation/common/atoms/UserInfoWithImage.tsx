// styles
import { Box, Typography, css } from "@mui/material";

interface UserInfoWithImageProps {
  src: string;
  name: string;
}

const UserInfoWithImage = ({ src, name }: UserInfoWithImageProps) => {
  return (
    <Box css={styles.container}>
      <img
        src={src}
        alt="user-profile-image-circle"
        css={styles.profileImage}
      />
      <Typography css={styles.text}>{name}</Typography>
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
