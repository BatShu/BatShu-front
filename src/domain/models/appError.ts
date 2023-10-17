interface IAppError {
  message: string;
  status: number;
}
export class AppError extends Error {
  status: number;
  constructor({ message, status }: IAppError) {
    super(message);
    this.status = status;
  }
}
