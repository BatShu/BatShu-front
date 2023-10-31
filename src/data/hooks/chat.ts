import { useMutation, useQuery } from "@tanstack/react-query";
import { chatRepository } from "../backend";
import { PostRoomDto } from "@/domain/dtos/chat";

export const useReadRoomsQuery = () => {
  return useQuery({
    queryKey: ["room"],
    queryFn: async () => {
      return await chatRepository.getRooms();
    },
  });
};

export const useReadRoomQuery = (roomId: number) => {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => {
      return await chatRepository.getRoom(roomId);
    },
  });
};

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: async (dto: PostRoomDto) => {
      return await chatRepository.postRoom(dto);
    },
  });
};
