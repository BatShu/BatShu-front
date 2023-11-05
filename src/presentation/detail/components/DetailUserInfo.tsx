import { Box, Skeleton, Typography, css } from "@mui/material";
// components
import UserInfoWithImage, {
  UserInfoWithImageSkeleton,
} from "@/presentation/common/atoms/UserInfoWithImage";
import { AppUser } from "@/domain/models/appUser";

interface DetailUserInfoProps {
  author: AppUser;
}

const DetailUserInfo = ({ author }: DetailUserInfoProps) => {
  return (
    <Box css={styles.userInfo}>
      <UserInfoWithImage
        profileImage={author.googleProfilephotoURL ?? ""}
        name={author.displayName ?? "익명"}
      />
      <Typography className="status">● 요청중</Typography>
    </Box>
  );
};

export const DetailUserInfoSkeleton = () => {
  return (
    <Box css={styles.userInfo}>
      <UserInfoWithImageSkeleton />
      <Skeleton css={styles.requestingSkeleton} />
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
  requestingSkeleton: css({ width: "50px", height: "30px" }),
};
