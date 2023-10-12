import { Box, Typography, css } from "@mui/material";
// types
import type { dummyDetail } from "../../home/temp";
// components
import UserInfoWithImage from "@/presentation/common/atoms/UserInfoWithImage";

interface DetailUserInfoProps {
  // author: (typeof dummyDetail)["author"];
  author: { [key: string]: any };
}

const DetailUserInfo = ({ author }: DetailUserInfoProps) => {
  return (
    <Box css={styles.userInfo}>
      <UserInfoWithImage
        profileImage={author.photoURL}
        name={author.displayName}
      />
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
