import { create } from "zustand";

export interface ILocation {
  lat: number;
  lng: number;
}

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
  location: { lat: 127.08118995506915, lng: 37.24291020655134 },
  status: { loading: true, error: false },
};

export const locationStore = create<locationState & setLocationState>(
  (set) => ({
    ...initialState,
    setLocation: (location: ILocation) =>
      set((prev) => ({ ...prev, location })),
    setStatus: (status: ILocationStatus) =>
      set((prev) => ({ ...prev, status })),
  })
);