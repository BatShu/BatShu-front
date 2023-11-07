import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { accidentObserverRepository, chatRepository } from "../backend";
import { GetMessageData, PostRoomDto } from "@/domain/dtos/chat";
import { useCallback } from "react";
import { AppMessage } from "@/domain/models/appMessage";

export const useReadRoomsQuery = () => {
  return useQuery({
    queryKey: ["room"],
    queryFn: async () => {
      return await chatRepository.getRooms();
    },
  });
};

export const useReadRoomWithIncidentQuery = (roomId: number) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      const room = await chatRepository.getRoom(roomId);
      if (room.isAccident) {
        const incident = await accidentObserverRepository.readAccidentById(
          room.id
        );
        return {
          ...room,
          incident: {
            ...incident,
            isAccident: true,
          },
        };
      }
      const incident = await accidentObserverRepository.readObserveById(
        room.id
      );
      return {
        ...room,
        incident: {
          ...incident,
          isAccident: false,
        },
      };
    },
  });
};

export const useReadMessageQuery = (roomId: number) => {
  return useQuery({
    queryKey: ["message", roomId],
    queryFn: async () => {
      return await chatRepository.getMessage(roomId);
    },
  });
};

export const useReadMessageQueryUpdater = () => {
  const queryClient = useQueryClient();
  return useCallback(
    (roomId: number, dto: AppMessage) => {
      queryClient.setQueryData(
        ["message", roomId],
        (oldData: GetMessageData | undefined) => {
          if (oldData == null) {
            return oldData;
          }
          return {
            ...oldData,
            chatList: [dto, ...oldData.chatList],
          };
        }
      );
    },
    [queryClient]
  );
};

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: async (dto: PostRoomDto) => {
      return await chatRepository.postRoom(dto);
    },
  });
};
