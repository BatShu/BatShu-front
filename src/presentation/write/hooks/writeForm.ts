import dayjs from "dayjs";
// store
import { ILocation } from "@/domain/models/location";
// lib
import { TFile } from "@/lib";
import {
  UseFormProps,
  UseFormReturn,
  useForm,
  useFormContext,
} from "react-hook-form";

type TWriter = "사고자" | "목격자" | null;

type TContent = {
  videoId: number | null;
  photos: TFile[];
  location: ILocation | null;
  placeName: string;
  carModelName: string;
  bounty: number;
  description: string;
};

export interface writeFormState {
  type: TWriter;
  title: string;
  licensePlate: string;
  accidentTime: [string, string];
  content: TContent;
}

const initialState: writeFormState = {
  type: null,
  title: "",
  licensePlate: "",
  accidentTime: [dayjs().format(), dayjs().format()],
  content: {
    videoId: null,
    photos: [],
    location: null,
    placeName: "",
    carModelName: "",
    bounty: 0,
    description: "",
  },
};
export const useWriteForm = (
  props?: UseFormProps<writeFormState>
): UseFormReturn<writeFormState> => {
  return useForm<writeFormState>({
    ...props,
    defaultValues: initialState,
  });
};

export const useWriteFormContext = () => {
  return useFormContext<writeFormState>();
};
