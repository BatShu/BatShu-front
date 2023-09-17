import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
import { ILocation } from "./locationStore";

type TWriter = "사고자" | "목격자" | null;

type TContent = {
  video: File | null;
  date: { from: Dayjs; to: Dayjs };
  location: ILocation | null;
  mapLevel: number;
};

interface writeFormState {
  type: TWriter;
  content: TContent;
}

interface setwriteFormState {
  setType: (type: TWriter) => void;
  setVideo: (video: File) => void;
  setFrom: (from: Dayjs) => void;
  setTo: (to: Dayjs) => void;
  setLocation: (location: ILocation | null) => void;
  setMapLevel: (mapLevel: number) => void;
  resetForm: () => void;
}

const initialState: writeFormState = {
  type: null,
  content: {
    video: null,
    date: { from: dayjs(), to: dayjs() },
    location: null,
    mapLevel: 3,
  },
};

export const writeFormStore = create<writeFormState & setwriteFormState>(
  (set) => ({
    ...initialState,
    setType: (type: TWriter) => set((prev) => ({ ...prev, type })),
    setVideo: (video: File) =>
      set((prev) => ({ ...prev, content: { ...prev.content, video } })),
    setFrom: (from: Dayjs) =>
      set((prev) => ({
        ...prev,
        content: { ...prev.content, date: { ...prev.content.date, from } },
      })),
    setTo: (to: Dayjs) =>
      set((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          date: { ...prev.content.date, to },
        },
      })),
    setMapLevel: (mapLevel: number) =>
      set((prev) => ({ ...prev, content: { ...prev.content, mapLevel } })),
    setLocation: (location: ILocation | null) =>
      set((prev) => ({ ...prev, content: { ...prev.content, location } })),
    resetForm: () => set((prev) => ({ ...prev, ...initialState })),
  })
);
