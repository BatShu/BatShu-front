import { css } from "@emotion/react";
import { Box } from "@mui/material";
import AppNavigationBar from "../common/components/AppNaviationBar";
import { pageContentStyles } from "../common/styles/pageStyles";
import { ProfileHeader } from "./ProfileHeader";

const ProfilePage = () => {
  return (
    <Box css={styles.pageWrapper}>
      <Box css={pageContentStyles}>
        <ProfileHeader />
        <Box css={styles.bottomMenu}>
          <Box css={styles.menuBar}>
            <AppNavigationBar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  pageWrapper: css({
    position: "relative",
    height: "100vh",
  }),
  bottomMenu: css({
    position: "relative",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    "& * > button": { pointerEvents: "auto" },
  }),
  menuBar: css({
    position: "absolute",
    width: "100%",
    bottom: "36px",
    left: 0,
  }),
};

export default ProfilePage;
