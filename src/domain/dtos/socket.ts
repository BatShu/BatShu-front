export interface SendMessageDto {
  roomId: number;
  sendUserUid: string;
  message: string;
}

export interface FileObjectType {
  fileData: ArrayBuffer;
  filename: string;
}
export interface SendFileDto {
  roomId: number;
  sendUserUid: string;
  file: FileObjectType;
}

export interface SendAccountRequest {
  roomId: number;
  sendUserUid: string;
}
