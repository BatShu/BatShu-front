import { useMutation, useQuery } from "@tanstack/react-query";
import { chatRepository } from "../backend";
import { PostRoomDto } from "@/domain/dtos/chat";

export const useReadRoomsQuery = (uid: string) => {
  return useQuery({
    queryKey: ["room", uid],
    queryFn: async () => {
      return await chatRepository.getRoom(uid);
    },
  });
};

export const useCreateRoomMutation = () => {
  return useMutation({
    mutationFn: async (dto: PostRoomDto) => {
      await chatRepository.postRoom(dto);
    },
  });
};
