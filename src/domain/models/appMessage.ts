export type MessageType = "message" | "file" | "account";
export interface AppMessage {
  roomId: number;
  sendUserUid: string;
  messageType: MessageType;
  message: string;
  createdAt: string;
}
