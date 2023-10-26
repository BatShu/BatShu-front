import { AccidentPreview } from "../models/accident";

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
