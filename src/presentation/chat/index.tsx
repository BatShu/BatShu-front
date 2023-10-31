import { useState, useRef, ReactElement } from "react";
// styles
import { Box, css } from "@mui/material";
import { pageContentStyles } from "../common/styles/pageStyles";
// components
import Splash from "../common/layout/Splash";
import AppNavigationBar from "../common/components/AppNaviationBar";

const ChatPage = () => {
  return (
    <Box css={styles.pageWrapper}>
      <Splash />

      <Box css={pageContentStyles}>
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

export default ChatPage;
