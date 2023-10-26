import { AppUser } from "./appUser";
import { ILocation } from "./location";
export interface Accident {
  id: number;
  author: AppUser;
  contentTitle: string;
  contentDescription: string;
  photos: string[];
  accidentTime: [string, string];
  accidentLocation: ILocation;
  createdAt: string;
  bounty: string;
}
