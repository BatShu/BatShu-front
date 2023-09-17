import { AppUser } from "./appUser";
import { AppLocation } from "./location";
export interface Accident {
  id: number;
  author: AppUser;
  contentTitle: string;
  contentDescription: string;
  photos: string[];
  accidentTime: string;
  accidentlocation: AppLocation;
  createdTime: string;
}
