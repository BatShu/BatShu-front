// styles
import { Box, css } from "@mui/material";
import { pageContentStyles } from "../common/styles/pageStyles";
// components
import AppNavigationBar from "../common/components/AppNaviationBar";
import { useReadRoomsQuery } from "@/data/hooks/chat";
import { ChatPreview } from "./components/ChatPreview";
import { ReactComponent as BatshuIcon } from "@/presentation/common/icons/logo-long-black.svg";
import { ChatEmpty } from "./components/ChatEmpty";
const ChatPage = () => {
  const { data: rooms, isLoading } = useReadRoomsQuery();
  return (
    <Box css={styles.pageWrapper}>
      <Box css={styles.header}>
        <BatshuIcon css={styles.headerLogo} />
      </Box>
      <Box>
        {!isLoading && rooms?.length == 0 ? (
          <ChatEmpty />
        ) : (
          rooms?.map((room) => {
            return <ChatPreview key={room.roomId} room={room} />;
          })
        )}
      </Box>

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
    display: "flex",
    flexDirection: "column",
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
  header: css`
    padding: 16px 24px;
  `,
  headerLogo: css`
    width: 100px;
  `,
};

export default ChatPage;
