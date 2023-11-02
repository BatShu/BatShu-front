import { ILocationDto } from "../dtos/location";
import { AppUser } from "./appUser";

export interface Observe extends Exclude<AppUser, "email"> {
  videoId: number;
  videoUrl: string;
  thumbnailUrl: string;
  contentTitle: string;
  contentDescription: string;
  carModelName: string;
  licensePlate: string;
  observeStartTime: string;
  observeEndTime: string;
  observeLocation: ILocationDto;
  createdAt: string;
}
export interface ObservePreview {
  observeId: number;
  observeLocation: ILocationDto;
  licensePlate: string;
  observeTime: [string, string];
}
