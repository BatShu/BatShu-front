import { TFile } from "@/lib";
import { AccidentPreview } from "../models/accident";
import { ILocation } from "../models/location";

export interface ReadAccidentsByLocationDto {
  x: number;
  y: number;
  radius: number;
}

export type ReadAccidentsByLocationData = AccidentPreview[];
export type UpdateVideoData = {
  videoId: [
    {
      id: number;
    }
  ];
};

export type PostAccidentDto = {
  contentTitle: string;
  contentDescription: string;
  licensePlate: string;
  accidentTime: [string, string];
  accidentLocation: ILocation | null;
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
  observeLocation: ILocation | null;
  placeName: string;
  carModelName: string;
  videoId: number | null;
};
