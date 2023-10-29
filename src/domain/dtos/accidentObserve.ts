import { TFile } from "@/lib";
import { AccidentPreview } from "../models/accident";
import { ILocationDto } from "./location";
import { ObservePreview } from "../models/observe";

export interface ReadByLocationDto {
  x: number;
  y: number;
  radius: number;
}

export type ReadAccidentsByLocationData = AccidentPreview[];

export type ReadObservesByLocationData = ObservePreview[];
export type UpdateVideoData = {
  id: number;
};

export type PostAccidentDto = {
  contentTitle: string;
  contentDescription: string;
  licensePlate: string;
  accidentTime: [string, string];

  accidentLocation: ILocationDto | null;
  placeName: string;
  carModelName: string;
  bounty: number;
  photos: TFile[];
};

export type PostObserveDto = {
  contentTitle: string;
  contentDescription: string;
  licensePlate: string;
  observeTime: [string, string];
  observeLocation: ILocationDto | null;
  placeName: string;
  carModelName: string;
  videoId: number | null;
};
