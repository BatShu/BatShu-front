import { Box, Typography, css } from "@mui/material";
// components
import UserInfoWithImage from "@/presentation/common/atoms/UserInfoWithImage";

interface DetailUserInfoProps {
  displayName: string | null;
  photoURL: string;
}

const DetailUserInfo = ({ displayName, photoURL }: DetailUserInfoProps) => {
  return (
    <Box css={styles.userInfo}>
      <UserInfoWithImage profileImage={photoURL} name={displayName} />
      <Typography className="status">● 요청중</Typography>
    </Box>
  );
};

export default DetailUserInfo;

const styles = {
  userInfo: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .status": { fontSize: "12px", color: "#68CCE2" },
  }),
};
