import { User } from "firebase/auth";
import { ILocation } from "./location";
export interface Observe {
  author: User;
  contentTitle: string;
  contentDescription: string;
  photos: string[];
  accidentTime: string;
  accidentlocation: ILocation;
  createdTime: string;
}
