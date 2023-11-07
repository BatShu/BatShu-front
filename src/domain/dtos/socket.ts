export interface SendMessageDto {
  roomId: number;
  sendUserUid: string;
  message: string;
}

export interface SendFileDto {
  roomId: number;
  sendUserUid: string;
  file: Blob;
}

export interface SendAccountRequest {
  roomId: number;
  sendUserUid: string;
}
