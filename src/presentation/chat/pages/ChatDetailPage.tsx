import {
  useReadMessageQuery,
  useReadMessageQueryUpdater,
  useReadRoomWithIncidentQuery,
} from "@/data/hooks/chat";
import { Box, css } from "@mui/material";
import { ReactElement, useCallback, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  ChatDetailHeader,
  ChatDetailHeaderSkeleton,
} from "../components/ChatDetailHeader";
import { ChatBar } from "../components/ChatBar";
import { SocketRepository } from "@/data/backend/socket";
import { SendMessageDto } from "@/domain/dtos/socket";
import { ChatMessage } from "../components/ChatMessage";
import { useQueryClient } from "@tanstack/react-query";
import { GetMessageData } from "@/domain/dtos/chat";

export const ChatDetailPageFallback = (): ReactElement => {
  const { roomId } = useParams();
  if (roomId == null) {
    throw new Error("roomId is null");
  }
  const parsedRoomId = parseInt(roomId);
  return <ChatDetailPage roomId={parsedRoomId} />;
};

interface ChatDetailPageProps {
  roomId: number;
}
export const ChatDetailPage = ({
  roomId,
}: ChatDetailPageProps): ReactElement => {
  const { data, isLoading } = useReadRoomWithIncidentQuery(roomId);

  if (isLoading) {
    return (
      <>
        <ChatDetailHeaderSkeleton />
      </>
    );
  }

  if (data == null) {
    throw new Error("data is null");
  }
  return (
    <>
      <Box css={styles.pageWrapper}>
        <ChatDetailHeader incident={data.incident} />
        <ChatDetail roomId={roomId} />
      </Box>
    </>
  );
};

interface ChatDetailProps {
  roomId: number;
}
const ChatDetail = ({ roomId }: ChatDetailProps): ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const { data: messages, isPreviousData } = useReadMessageQuery(roomId);

  const updateQueryData = useReadMessageQueryUpdater();
  const scrollToBottom = (isPreviousData: boolean) => {
    if (ref.current && !isPreviousData) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom(isPreviousData);
  }, [messages, isPreviousData]);
  const handleReceive = useCallback(
    (dto: SendMessageDto) => {
      updateQueryData(roomId, dto);
    },
    [updateQueryData, roomId]
  );
  const socketRepository = useMemo(() => {
    return new SocketRepository(roomId, handleReceive);
  }, [roomId, handleReceive]);

  useEffect(() => {
    return () => {
      socketRepository.disconnect();
    };
  }, [socketRepository]);
  return (
    <>
      <Box css={styles.messageContainer} ref={ref}>
        {messages?.chatList.toReversed().map((message) => {
          return <ChatMessage key={message.createdAt} message={message} />;
        })}
      </Box>

      <ChatBar roomId={roomId} socketRepository={socketRepository} />
    </>
  );
};

const styles = {
  pageWrapper: css`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
  messageContainer: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px 24px;
    overflow-y: scroll;
    gap: 20px;
    padding-bottom: 70px;
  `,
};
