import { ILocationDto } from "../dtos/location";
import { AppUser } from "./appUser";
export interface Accident {
  id: number;
  author: AppUser;
  contentTitle: string;
  contentDescription: string;
  photoUrls: string[];
  accidentTime: [string, string];
  createdAt: string;
  accidentlocation: ILocationDto;
  carModelName: string;
  licensePlate: string;
  bounty: number;
  uid: string;
}

export interface AccidentPreview {
  accidentId: number;
  accidentLocation: ILocationDto;
}
