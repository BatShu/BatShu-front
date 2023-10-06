import { ILocation } from "@/domain/models/location";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ILocationStatus {
  loading: boolean;
  error: boolean;
}

interface locationState {
  location: ILocation;
  status: ILocationStatus;
}

interface setLocationState {
  setLocation: (location: ILocation) => void;
  setStatus: (status: ILocationStatus) => void;
}

const initialState: locationState = {
  location: {
    y: 37.24291020655134,
    x: 127.08118995506915,
    level: 3,
    place: null,
  },
  status: { loading: true, error: false },
};

export const locationStore = create<locationState & setLocationState>(
  devtools((set) => ({
    ...initialState,
    setLocation: (location: ILocation) =>
      set((prev) => ({ ...prev, location })),
    setStatus: (status: ILocationStatus) =>
      set((prev) => ({ ...prev, status })),
  }))
);
