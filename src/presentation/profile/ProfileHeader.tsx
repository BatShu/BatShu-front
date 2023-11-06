import { useAuthStore } from "@/store/authStore";
import { Box, Avatar, Typography, css, IconButton } from "@mui/material";
import { ReactComponent as NotiIcon } from "@/presentation/common/icons/outlined/Notification 1.svg";
import { ReactComponent as SettingIcon } from "@/presentation/common/icons/outlined/Setting.svg";
import { useSignOut } from "@/data/hooks/auth";
export const ProfileHeader = () => {
  const { appUser } = useAuthStore();
  const { mutate: signOut } = useSignOut();
  return (
    <Box css={styles.headerContainer}>
      <Box css={styles.profileInfo}>
        <Avatar src={appUser?.googleProfilephotoURL} />
        <Typography>{appUser?.displayName}</Typography>
      </Box>
      <Box css={styles.actions}>
        <IconButton>
          <NotiIcon />
        </IconButton>
        <IconButton onClick={() => signOut()}>
          <SettingIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const styles = {
  headerContainer: css`
    display: flex;
    width: 100%;
    justify-content: space-between;
  `,
  profileInfo: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  actions: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
};
