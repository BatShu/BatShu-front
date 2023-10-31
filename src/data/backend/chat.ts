import { PostRoomDto } from "@/domain/dtos/chat";
import { authApi } from "../util/fetcher";
import { Room } from "@/domain/models/room";
import { AppResponse } from "@/domain/models/appResponse";

export class ChatRepository {
  async postRoom(dto: PostRoomDto) {
    await authApi.post("api/room", dto);
  }

  async getRoom(uid: string): Promise<Room[]> {
    const res = await authApi.get<AppResponse<Room[]>>(`api/room/${uid}`);
    return res.data.data;
  }
}
