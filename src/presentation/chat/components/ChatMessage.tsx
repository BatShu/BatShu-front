import { useReadUserById } from "@/data/hooks/user";
import { AppMessage } from "@/domain/models/appMessage";
import { useAuthStore } from "@/store/authStore";
import { Avatar, Box, Typography, css } from "@mui/material";
import { ReactElement } from "react";
import { ImageOrVideo } from "./ImageOrVideo";

interface ChatMessageProps {
  message: AppMessage;
}
export const ChatMessage = ({ message }: ChatMessageProps): ReactElement => {
  const { data: sendor } = useReadUserById(message.sendUserUid);

  const { appUser } = useAuthStore();
  const isSelf = appUser?.uid == message.sendUserUid;
  return (
    <Box css={styles.messageContainer(isSelf)}>
      {!isSelf && (
        <Avatar src={sendor?.googleProfilephotoURL} css={styles.avatar} />
      )}
      <Box css={styles.typoContainer}>
        {!isSelf && <Typography>{sendor?.displayName}</Typography>}
        {message.messageType == "message" && (
          <Typography css={styles.message}>{message.message}</Typography>
        )}
        {message.messageType == "file" && (
          <Box css={styles.imageContainer(isSelf)}>
            <ImageOrVideo src={message.message} css={styles.image} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  messageContainer: (isSelf: boolean) => css`
    display: flex;
    align-items: center;
    justify-content: ${isSelf ? "flex-end" : "flex-start"};
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
    width: fit-content;
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
  imageContainer: (isSelf: boolean) => css`
    display: flex;
    justify-content: ${isSelf ? "flex-end" : "flex-start"};
  `,
  image: css`
    width: 200px;
    height: 200px;
    object-fit: cover;
    aspect-ratio: 1;
    border-radius: 8px;
    padding: 5px;
    background: #fff;
  `,
};
