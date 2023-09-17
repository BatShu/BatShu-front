import { User } from "firebase/auth";
import { AppLocation } from "./location";
export interface Observe {
  author: User;
  contentTitle: string;
  contentDescription: string;
  photos: string[];
  accidentTime: string;
  accidentlocation: AppLocation;
  createdTime: string;
}
