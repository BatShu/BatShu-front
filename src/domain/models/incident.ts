import { Accident } from "./accident";
import { Observe } from "./observe";

export type Incident =
  | (Accident | Observe) & {
      isAccident: boolean;
    };

// @ts-ignore
export const isAccident = (incident: Incident): incident is Accident => {
  return incident.isAccident;
};
