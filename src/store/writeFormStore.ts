import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";
// store
import { ILocation } from "./locationStore";
// lib
import { TFile, updateOnlyDate, setExactTimeOnDate } from "@/lib";

type TWriter = "사고자" | "목격자" | null;

type TContent = {
  video: TFile | null;
  images: TFile[] | null;
  location: ILocation | null;
  carModelName: string;
  bounty: number;
  description: string;
  mapLevel: number;
};

interface writeFormState {
  type: TWriter;
  title: string;
  licensePlate: string;
  accidentTime: [string, string];
  content: TContent;
}

interface setwriteFormState {
  setType: (type: TWriter) => void;
  setTitle: (title: string) => void;
  setLicensePlate: (licensePlate: string) => void;
  setOnlyDate: (date: Dayjs) => void;
  setAccidentTimeFrom: (from: number) => void;
  setAccidentTimeTo: (to: number) => void;
  setContent: (content: Partial<TContent>) => void;
  resetContents: () => void;
}

const initialState: writeFormState = {
  type: null,
  title: "",
  licensePlate: "",
  accidentTime: [dayjs().format(), dayjs().format()],
  content: {
    video: null,
    images: [],
    location: null,
    carModelName: "",
    bounty: 0,
    description: "",
    mapLevel: 3,
  },
};

export const writeFormStore = create<writeFormState & setwriteFormState>(
  (set) => ({
    ...initialState,
    setType: (type: TWriter) => set((prev) => ({ ...prev, type })),
    setTitle: (title: string) => set((prev) => ({ ...prev, title })),
    setLicensePlate: (licensePlate: string) =>
      set((prev) => ({ ...prev, licensePlate })),
    setContent: (content: Partial<TContent>) =>
      set((prev) => ({ ...prev, content: { ...prev.content, ...content } })),
    setOnlyDate: (newDate: Dayjs) =>
      set((prev) => {
        const newAccidentTime = prev.accidentTime.map((time) =>
          updateOnlyDate(dayjs(time), newDate)
        ) as [string, string];

        return {
          ...prev,
          accidentTime: newAccidentTime,
        };
      }),
    setAccidentTimeFrom: (time: number) =>
      set((prev) => ({
        ...prev,
        accidentTime: [
          setExactTimeOnDate(dayjs(prev.accidentTime[0]), time),
          prev.accidentTime[1],
        ],
      })),
    setAccidentTimeTo: (time: number) =>
      set((prev) => ({
        ...prev,
        accidentTime: [
          prev.accidentTime[0],
          setExactTimeOnDate(dayjs(prev.accidentTime[1]), time),
        ],
      })),
    resetContents: () =>
      set((prev) => {
        const {
          content: { images, video },
        } = prev;

        images?.forEach((image) => {
          URL.revokeObjectURL(image.url);
        });
        if (video) URL.revokeObjectURL(video.url);
        return { ...initialState, type: prev.type };
      }),
  })
);
