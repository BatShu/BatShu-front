import { SendFileDto, SendMessageDto } from "@/domain/dtos/socket";
import { io, Socket } from "socket.io-client";
export class SocketRepository {
  socket: Socket;
  constructor(roomId: number, onMessage: (message: SendMessageDto) => void) {
    this.socket = io(import.meta.env.VITE_API_BASE_URL);

    this.socket.emit("join", `${roomId}`);
    this.socket.on("message", onMessage);
  }
  async sendMessage(dto: SendMessageDto) {
    this.socket.emit("sendChat", dto);
  }

  async sendFile(dto: SendFileDto) {
    this.socket.emit("sendFile", dto);
  }

  async sendAccountRequest(dto: SendMessageDto) {
    this.socket.emit("sendAccount", dto);
  }

  async disconnect() {
    this.socket.disconnect();
    this.socket.removeAllListeners();
  }
}
