import { AppMessage } from "../models/appMessage";

export interface PostRoomDto {
  isAccident: boolean;
  id: number;
}

export interface PostRoomData {
  roomId: number;
}

export interface GetMessageData {
  accidentOrObserve: boolean;
  id: number;
  chatList: AppMessage[];
}
