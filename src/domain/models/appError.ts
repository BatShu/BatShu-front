interface IAppError {
  message: string;
  status: number;
}
export class AppApiError extends Error {
  status: number;
  constructor({ message, status }: IAppError) {
    super(message);
    this.status = status;
  }
}
