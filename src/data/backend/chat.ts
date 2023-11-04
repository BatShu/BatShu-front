import { PostRoomData, PostRoomDto } from "@/domain/dtos/chat";
import { authApi } from "../util/fetcher";
import { Room } from "@/domain/models/room";
import { AppResponse } from "@/domain/models/appResponse";
import { AppMessage } from "@/domain/models/appMessage";

export class ChatRepository {
  async postRoom(dto: PostRoomDto): Promise<PostRoomData> {
    const res = await authApi.post<AppResponse<PostRoomData>>("api/room", dto);
    return res.data.data;
  }

  async getRooms(): Promise<Room[]> {
    const res = await authApi.get<AppResponse<Room[]>>(`api/room`);
    return res.data.data;
  }

  async getRoom(roomId: number): Promise<Room> {
    const res = await authApi.get<AppResponse<Room>>(`api/room/${roomId}`);
    return res.data.data;
  }

  async getMessage(roomId: number): Promise<AppMessage> {
    const res = await authApi.get<AppResponse<AppMessage>>(
      `api/message/${roomId}`
    );
    return res.data.data;
  }
}
