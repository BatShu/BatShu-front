import { useState, useRef, ReactElement } from "react";
// styles
import { Box, css } from "@mui/material";
import { pageContentStyles } from "../common/styles/pageStyles";
// components
import Splash from "../common/layout/Splash";
import AppNavigationBar from "../common/components/AppNaviationBar";
import { useReadRoomsQuery } from "@/data/hooks/chat";
import { useAuthStore } from "@/store/authStore";

const ChatPage = () => {
  const { appUser } = useAuthStore();
  if (appUser === null) throw new Error("로그인이 필요합니다.");
  const { data: rooms } = useReadRoomsQuery(appUser.uid);
  return (
    <Box css={styles.pageWrapper}>
      <Splash />

      <Box css={pageContentStyles}>
        {rooms?.map((room) => {
          return (
            <Box key={room.roomId}>
              <Box>{room.lastChat}</Box>
              <Box>{room.lastChatCreatedAt}</Box>
            </Box>
          );
        })}
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
