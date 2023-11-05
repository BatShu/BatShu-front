import {
  useReadMessageQuery,
  useReadRoomWithIncidentQuery,
} from "@/data/hooks/chat";
import { Box } from "@mui/material";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  ChatDetailHeader,
  ChatDetailHeaderSkeleton,
} from "../components/ChatDetailHeader";
import { pageContentStyles } from "@/presentation/common/styles/pageStyles";

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
      <ChatDetailHeader incident={data.incident} />
      <Box css={pageContentStyles}>
        <ChatDetail roomId={roomId} />
      </Box>
    </>
  );
};

interface ChatDetailProps {
  roomId: number;
}
const ChatDetail = ({ roomId }: ChatDetailProps): ReactElement => {
  const { data: messages } = useReadMessageQuery(roomId);

  return (
    <Box>
      {messages?.chatList.map((message) => {
        return <Box>{message.message}</Box>;
      })}
    </Box>
  );
};
