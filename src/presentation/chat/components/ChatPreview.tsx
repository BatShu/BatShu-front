import { useReadAccidentOrObserveAddress } from "@/data/hooks/accidentObserve";
import { useReadUserById } from "@/data/hooks/user";
import { CHAT_PATH } from "@/domain/constants/paths";
import { Room } from "@/domain/models/room";
import { Avatar, Box, Button, Typography, css } from "@mui/material";
import dayjs from "dayjs";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface ChatPreviewProps {
  room: Room;
}
export const ChatPreview = ({ room }: ChatPreviewProps): ReactElement => {
  const { data: user } = useReadUserById(room.uid);
  const { data: address } = useReadAccidentOrObserveAddress(
    room.id,
    room.isAccident
  );

  const getTimeAgo = (date: string) => {
    if (date == null || date == "") {
      return "";
    }
    const minDiffer = dayjs().diff(dayjs(date)) / 1000;
    if (minDiffer < 60) {
      return `${Math.floor(minDiffer)}분 전`;
    }
    if (minDiffer < 60 * 24) {
      return `${Math.floor(minDiffer / 60)}시간 전`;
    }
    return `${Math.floor(minDiffer / 60 / 24)}일 전`;
  };
  return (
    <Link to={`${CHAT_PATH}/${room.roomId}`} css={styles.link}>
      <Button css={styles.chatPreviewContainer}>
        <Avatar
          src={user?.googleProfilephotoURL}
          alt="avatar"
          css={styles.avatar}
        />
        <Box css={styles.detailContainer}>
          <Box css={styles.detailHeaderContainer}>
            <Typography css={styles.nickname}>{user?.displayName}</Typography>
            <Typography css={styles.locationChip}>
              {address?.region_2depth_name} {address?.region_3depth_name}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Typography css={styles.timeAgo}>
              {getTimeAgo(room.lastChatCreatedAt)}
            </Typography>
          </Box>
          <Typography css={styles.chat} variant="h6">
            {room.lastChat}
          </Typography>
        </Box>
      </Button>
    </Link>
  );
};

const styles = {
  link: css`
    text-decoration: none;
  `,
  chatPreviewContainer: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    padding: 12px 30px;
    border-bottom: 1px solid var(--white-outline, #e9e9e9);
  `,
  avatar: css`
    width: 52px;
    height: 52px;
    border-radius: 8px;
  `,
  detailContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    flex: 1;
  `,
  detailHeaderContainer: css`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  `,
  nickname: css`
    color: var(--sub-color, #5c5c5c);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.41px;
  `,
  locationChip: css`
    color: #878787;
    text-align: center;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.41px;
    display: flex;
    padding: 5px 13px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid var(--white-outline, #f2f2f2);
    background: #fff;
  `,
  timeAgo: css`
    color: #c2c2c2;
    text-align: right;
    font-family: Pretendard;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.41px;
  `,
  chat: css`
    height: 12px;
    color: #787878;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.41px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,
};
