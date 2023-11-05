import { useReadUserById } from "@/data/hooks/user";
import { AppMessage } from "@/domain/models/appMessage";
import { Avatar, Box, Typography, css } from "@mui/material";
import { ReactElement } from "react";

interface ChatMessageProps {
  message: AppMessage;
}
export const ChatMessage = ({ message }: ChatMessageProps): ReactElement => {
  const { data: sendor } = useReadUserById(message.sendUserUid);
  return (
    <Box css={styles.messageContainer}>
      <Avatar src={sendor?.googleProfilephotoURL} css={styles.avatar} />
      <Box css={styles.typoContainer}>
        <Typography>{sendor?.displayName}</Typography>
        <Typography css={styles.message}>{message.message}</Typography>
      </Box>
    </Box>
  );
};

const styles = {
  messageContainer: css`
    display: flex;
    align-items: start;
    gap: 16px;
  `,
  avatar: css`
    width: 44px;
    height: 44px;
  `,
  typoContainer: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  message: css`
    display: inline-flex;
    padding: 5px 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #fff;
    color: var(--sub-color, #5c5c5c);
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.41px;
    overflow-x: hidden;
    word-break: break-all;
  `,
};
