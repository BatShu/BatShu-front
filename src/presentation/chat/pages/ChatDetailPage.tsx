import { useReadRoomQuery } from "@/data/hooks/chat";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";

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
  const { data } = useReadRoomQuery(roomId);
  return <>{data?.roomId}</>;
};
